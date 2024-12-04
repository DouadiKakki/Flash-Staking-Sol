//@ts-nocheck

import React, { useState } from 'react';
import { numberFormatter } from '../../utils/utils';
import DefaultSelect from '../../components/Select';
import ReactApexChart from "react-apexcharts";

const chartOptions = {
	chart: {
		type: 'area',
		height: 200,
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
	fill: {
		type: 'gradient',
		gradient: {
			shadeIntensity: 1,
			opacityFrom: 0.5,
			opacityTo: 0,
			stops: [0, 70, 100]
		},
	},
	tooltip: {
		custom: (props: any) => {
			return '<div class="chart-tooltip-container bg-black px-2">' +
				'<span class="chart-tooltip-font text-white">' + props.series[props.seriesIndex][props.dataPointIndex] + '</span>' +
				'</div>'
		}
	},
	xaxis: {
		categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Aug", "Sep", "Oct", "Nov", "Dec"],
		labels: {
			style: {
				colors: "#7A7E82",
				fontSize: '14px',
			}
		},
		tooltip: false
	},
	yaxis: {
		labels: {
			style: {
				colors: "#7A7E82"
			}
		},
	},
	legend: {
		show: false
	}
};

const _chartSeries = [
	{
		name: "Staked",
		data: [100, 200, 250, 180, 220, 230, 230, 240, 200, 120, 170, 250],
	},
];

const Graphs = () => {

	const [type, setType] = useState('stake');
	const [period, setPeriod] = useState(0);

	const [chartSeries, setChartSeries] = useState(_chartSeries);

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
							{ value: 1, label: "Last Week" },
							{ value: 2, label: "Thirty" },
						]}
						value={period}
						setValue={setPeriod}
					/>
				</div>
			</div>
			<div className='w-full h-[1px] bg-[#2e2e2e] mt-[12px] md:mt-[22px]'></div>
			<div className='w-full flex flex-row items-center mt-[16px]'>
				<span className='text-white text-[18px] md:text-[28px] font-[400]'>{numberFormatter(46568.23)}</span>
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
