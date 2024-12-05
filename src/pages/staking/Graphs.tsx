//@ts-nocheck

import React, { useEffect, useState } from 'react';
import { numberFormatter } from '../../utils/utils';
import DefaultSelect from '../../components/Select';
import ReactApexChart from "react-apexcharts";
import { formatAmount, getAllUserStakeInfo } from '../../utils/web3-utils';
import { useConnection } from '@solana/wallet-adapter-react';
import dayjs from 'dayjs';

const _chartOptions = {
	chart: {
		type: 'area',
		height: 180,
		toolbar: { show: false },
	},
	stroke: {
		curve: "smooth",
		width: 2
	},
	colors: ["#FBBF04"],
	dataLabels: {
		enabled: false
	},
	// fill: {
	// 	type: 'gradient',
	// 	gradient: {
	// 		shadeIntensity: 1,
	// 		opacityFrom: 0.5,
	// 		opacityTo: 0,
	// 		stops: [0, 70, 100]
	// 	},
	// },
	tooltip: {
		custom: (props: any) => {
			return '<div class="chart-tooltip-container bg-black px-2">' +
				'<span class="chart-tooltip-font text-white">' + props.series[props.seriesIndex][props.dataPointIndex] + '</span>' +
				'</div>'
		}
	},
	xaxis: {
		type: 'category',
		categories: [],
		labels: {
			formatter: function (value, timestamp) {
				return dayjs(timestamp).format("YYYY/MM/DD");
			},
		},
		tooltip: false,
		min: 0,
		max: 10,
		tickAmount: 6,
	},
	yaxis: {
		labels: {
			style: {
				colors: "#7A7E82"
			}
		},
		forceNiceScale: true,
	},
	legend: {
		show: false
	}
};

const Graphs = ({ updateKey }) => {

	const { connection } = useConnection();

	const [type, setType] = useState('stake');
	const [period, setPeriod] = useState(0);

	const [totalStaked, setTotalStaked] = useState(0);
	const [stakingInfos, setStakingInfos] = useState([]);

	const [chartOptions, setChartOptions] = useState(_chartOptions);
	const [chartSeries, setChartSeries] = useState([]);

	const loadStatistics = async () => {
		try {
			let result = await getAllUserStakeInfo(connection);
			console.log("🚀 ~ loadStatistics ~ result:", result);
			const stakings = {};

			let firstDate = null;
			for (const userItem of result) {
				for (const stakingItem of userItem.info.stakingList) {
					let date = new Date(Number(stakingItem.startTime) * 1000);
					let key = dayjs(date).format("YYYY-MM-DD");
					if (!stakings[key]) {
						stakings[key] = 0;
					}
					stakings[key] += formatAmount(stakingItem.stakeAmount);
					if (firstDate == null || firstDate.getTime() > date.getTime()) {
						firstDate = date;
					}
				}
			}

			const allStakingInfos = [];
			let nowDate = new Date(); nowDate.setHours(23, 59, 59);
			if (firstDate != null) {
				while (firstDate.getTime() < nowDate.getTime()) {
					let key = dayjs(firstDate).format("YYYY-MM-DD");
					if (stakings[key]) {
						allStakingInfos.push({
							date: new Date(key),
							value: stakings[key]
						});
					} else {
						allStakingInfos.push({
							date: new Date(key),
							value: 0
						});
					}
					firstDate = dayjs(firstDate).add(1, 'day').toDate();
				}
			}

			setStakingInfos(allStakingInfos);
		} catch (err) {
			console.log("🚀 ~ loadStatistics ~ err:", err)
		}
	}

	useState(() => {
		loadStatistics();
	}, [updateKey]);

	useEffect(() => {
		if (!stakingInfos || stakingInfos.length == 0) {
			return;
		}

		const today = new Date();
		let startDate = null;
		if (period > 0) {
			startDate = dayjs(today).subtract(period, 'day').toDate();
			if (startDate.getTime() < stakingInfos[0].date.getTime()) {
				startDate = stakingInfos[0].date;
			}
		} else {
			startDate = stakingInfos[0].date;
		}
		let xmin = startDate.getTime();
		let xmax = today.getTime();

		
		let total = stakingInfos.slice(period > 0 ? -period : 0).reduce((prev, cur) => prev.value + cur.value);
		setTotalStaked(total);

		setChartOptions((prevChartOptions) => {
			let newOptions = JSON.parse(JSON.stringify(prevChartOptions));
			newOptions.xaxis.categories = stakingInfos.map(item => item.date);
			newOptions.xaxis.min = xmin;
			newOptions.xaxis.max = xmax;
			return newOptions;
		});
		setChartSeries([
			{
				name: "Staked",
				data: stakingInfos.map(item => item.value),
			},
		]);

		console.log("🚀 ~ Graphs ~ stakingInfos:", stakingInfos)
	}, [period, stakingInfos]);

	return (
		<div className='w-full h-full flex flex-col p-[16px] md:p-[24px] bg-[#1b1b1b] rounded-[8px] md:rounded-[12px]'>
			<div className='w-full flex flex-row justify-between items-center'>
				<div className='text-white text-[14px] md:text-[16px] font-[500]'>Staking</div>
				<div className='flex flex-row items-center gap-[8px]'>
					<DefaultSelect
						className='!h-[36px] px-[8px] py-[4px] text-white text-[12px]'
						options={[
							{ value: 'stake', label: "Staked" },
							{ value: 'fee', label: "Reduce Fees" },
						]}
						value={type}
						setValue={setType}
					/>
					<DefaultSelect
						className='!h-[36px] px-[8px] py-[4px] text-white text-[12px]'
						options={[
							{ value: 0, label: "All Time" },
							{ value: 7, label: "Last Week" },
							{ value: 30, label: "Thirty" },
						]}
						value={period}
						setValue={setPeriod}
					/>
				</div>
			</div>
			<div className='w-full h-[1px] bg-[#2e2e2e] mt-[12px] md:mt-[22px]'></div>
			<div className='w-full flex flex-row items-center mt-[16px]'>
				<span className='text-white text-[18px] md:text-[28px] font-[400]'>{numberFormatter(totalStaked)}</span>
				<span className='text-[#606060] text-[12px] md:text-[14px] font-[400] ml-1'>/ FLASH Staked</span>
			</div>
			<div className='w-full'>
				<ReactApexChart
					options={chartOptions}
					series={chartSeries}
					type="area"
					width="100%"
					height={230}
				/>
			</div>
		</div>
	);
};

export default Graphs;
