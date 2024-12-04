/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/flash_staking_solana.json`.
 */
export type FlashStakingSolana = {
  "address": "AJh1PBLUDwUxUqSj6Qrx8L543Jfu9LkKPVxFqJF4ov4z",
  "metadata": {
    "name": "flashStakingSolana",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "fund",
      "docs": [
        "Fund the staking pool for reward tokens."
      ],
      "discriminator": [
        218,
        188,
        111,
        221,
        152,
        113,
        174,
        7
      ],
      "accounts": [
        {
          "name": "poolInfo",
          "writable": true
        },
        {
          "name": "funder",
          "writable": true,
          "signer": true
        },
        {
          "name": "funderVault",
          "writable": true
        },
        {
          "name": "tokenVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  108,
                  97,
                  115,
                  104,
                  95,
                  112,
                  111,
                  111,
                  108,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "const",
                "value": [
                  233,
                  40,
                  57,
                  85,
                  9,
                  101,
                  255,
                  212,
                  214,
                  74,
                  202,
                  175,
                  70,
                  212,
                  93,
                  247,
                  49,
                  142,
                  91,
                  79,
                  87,
                  201,
                  12,
                  72,
                  125,
                  96,
                  98,
                  93,
                  130,
                  155,
                  131,
                  123
                ]
              }
            ]
          }
        },
        {
          "name": "tokenMint",
          "address": "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initialize",
      "docs": [
        "Initialize staking pool"
      ],
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "poolInfo",
          "writable": true,
          "signer": true
        },
        {
          "name": "tokenVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  108,
                  97,
                  115,
                  104,
                  95,
                  112,
                  111,
                  111,
                  108,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "const",
                "value": [
                  233,
                  40,
                  57,
                  85,
                  9,
                  101,
                  255,
                  212,
                  214,
                  74,
                  202,
                  175,
                  70,
                  212,
                  93,
                  247,
                  49,
                  142,
                  91,
                  79,
                  87,
                  201,
                  12,
                  72,
                  125,
                  96,
                  98,
                  93,
                  130,
                  155,
                  131,
                  123
                ]
              }
            ]
          }
        },
        {
          "name": "tokenMint",
          "address": "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "stake",
      "docs": [
        "Stake tokens"
      ],
      "discriminator": [
        206,
        176,
        202,
        18,
        200,
        209,
        179,
        108
      ],
      "accounts": [
        {
          "name": "poolInfo",
          "writable": true
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "userInfo",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  108,
                  97,
                  115,
                  104,
                  95,
                  115,
                  116,
                  97,
                  107,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "user"
              },
              {
                "kind": "account",
                "path": "pool_info.owner",
                "account": "poolInfo"
              }
            ]
          }
        },
        {
          "name": "userVault",
          "writable": true
        },
        {
          "name": "tokenVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  108,
                  97,
                  115,
                  104,
                  95,
                  112,
                  111,
                  111,
                  108,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "const",
                "value": [
                  233,
                  40,
                  57,
                  85,
                  9,
                  101,
                  255,
                  212,
                  214,
                  74,
                  202,
                  175,
                  70,
                  212,
                  93,
                  247,
                  49,
                  142,
                  91,
                  79,
                  87,
                  201,
                  12,
                  72,
                  125,
                  96,
                  98,
                  93,
                  130,
                  155,
                  131,
                  123
                ]
              }
            ]
          }
        },
        {
          "name": "tokenMint",
          "address": "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr"
        },
        {
          "name": "companyVault",
          "writable": true,
          "address": "HqNUFWT2UC16CPZpWVTAU4SV4R3CYFi1sBFJEpN89fVa"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "stakeTime",
          "type": "u64"
        },
        {
          "name": "stakePercent",
          "type": "u64"
        }
      ]
    },
    {
      "name": "unstake",
      "docs": [
        "Unstake tokens"
      ],
      "discriminator": [
        90,
        95,
        107,
        42,
        205,
        124,
        50,
        225
      ],
      "accounts": [
        {
          "name": "poolInfo",
          "writable": true
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "userInfo",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  108,
                  97,
                  115,
                  104,
                  95,
                  115,
                  116,
                  97,
                  107,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "user"
              },
              {
                "kind": "account",
                "path": "pool_info.owner",
                "account": "poolInfo"
              }
            ]
          }
        },
        {
          "name": "userVault",
          "writable": true
        },
        {
          "name": "tokenVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  108,
                  97,
                  115,
                  104,
                  95,
                  112,
                  111,
                  111,
                  108,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "const",
                "value": [
                  233,
                  40,
                  57,
                  85,
                  9,
                  101,
                  255,
                  212,
                  214,
                  74,
                  202,
                  175,
                  70,
                  212,
                  93,
                  247,
                  49,
                  142,
                  91,
                  79,
                  87,
                  201,
                  12,
                  72,
                  125,
                  96,
                  98,
                  93,
                  130,
                  155,
                  131,
                  123
                ]
              }
            ]
          }
        },
        {
          "name": "tokenMint",
          "address": "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr"
        },
        {
          "name": "companyVault",
          "writable": true,
          "address": "HqNUFWT2UC16CPZpWVTAU4SV4R3CYFi1sBFJEpN89fVa"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "stakingId",
          "type": "u16"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "poolInfo",
      "discriminator": [
        18,
        19,
        191,
        60,
        244,
        139,
        177,
        235
      ]
    },
    {
      "name": "userInfo",
      "discriminator": [
        83,
        134,
        200,
        56,
        144,
        56,
        10,
        62
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "zeroAmount",
      "msg": "The amount should be more than 0"
    },
    {
      "code": 6001,
      "name": "invalidPlan",
      "msg": "Plan is invalid"
    },
    {
      "code": 6002,
      "name": "stakeNotFinished",
      "msg": "Please wait until unstake time"
    },
    {
      "code": 6003,
      "name": "alreadyUnstaked",
      "msg": "You already unstaked"
    }
  ],
  "types": [
    {
      "name": "poolInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "totalStaked",
            "type": "u64"
          },
          {
            "name": "totalStakers",
            "type": "u64"
          },
          {
            "name": "totalRewardDistributed",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "stakingInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "stakeAmount",
            "type": "u64"
          },
          {
            "name": "startTime",
            "type": "u64"
          },
          {
            "name": "finishedTime",
            "type": "u64"
          },
          {
            "name": "profit",
            "type": "u64"
          },
          {
            "name": "unstaked",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "userInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "totalDeposit",
            "type": "u64"
          },
          {
            "name": "totalRewardDistributed",
            "type": "u64"
          },
          {
            "name": "stakingId",
            "type": "u16"
          },
          {
            "name": "stakingList",
            "type": {
              "vec": {
                "defined": {
                  "name": "stakingInfo"
                }
              }
            }
          },
          {
            "name": "key",
            "type": "pubkey"
          },
          {
            "name": "stakingPool",
            "type": "pubkey"
          }
        ]
      }
    }
  ]
};
