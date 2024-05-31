export const btcAbi = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_btcAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_sbtcAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_vbtcAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_positionManager",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_sbtcPool",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_vbtcPool",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "OwnableInvalidOwner",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "OwnableUnauthorizedAccount",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "T",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tokensDeposited",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "int24",
          "name": "lowerBound",
          "type": "int24"
        },
        {
          "indexed": false,
          "internalType": "int24",
          "name": "upperBound",
          "type": "int24"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "tokenType",
          "type": "address"
        }
      ],
      "name": "PositionCreated",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "BTC",
      "outputs": [
        {
          "internalType": "contract BTCTest",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "borrow",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "collectFees",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        },
        {
          "internalType": "int24",
          "name": "range",
          "type": "int24"
        },
        {
          "internalType": "bool",
          "name": "isStable",
          "type": "bool"
        }
      ],
      "name": "deposit",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "getCollateralValue",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "collat",
          "type": "uint256"
        }
      ],
      "name": "getMaxLTV",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_user",
          "type": "address"
        }
      ],
      "name": "getPosition",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "tokensDeposited",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amountBorrowed",
              "type": "uint256"
            },
            {
              "internalType": "int24",
              "name": "range",
              "type": "int24"
            },
            {
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "internalType": "uint128",
              "name": "liquidity",
              "type": "uint128"
            },
            {
              "internalType": "bool",
              "name": "stable",
              "type": "bool"
            }
          ],
          "internalType": "struct IManager.Position",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "fees",
          "type": "uint256"
        }
      ],
      "name": "getUserFeeShare",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "liquidate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "int24",
          "name": "currentTick",
          "type": "int24"
        },
        {
          "internalType": "int24",
          "name": "tickSpacing",
          "type": "int24"
        }
      ],
      "name": "nearestUsableTick",
      "outputs": [
        {
          "internalType": "int24",
          "name": "",
          "type": "int24"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "payBack",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "positionManager",
      "outputs": [
        {
          "internalType": "contract INonfungiblePositionManager",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "positions",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "tokensDeposited",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountBorrowed",
          "type": "uint256"
        },
        {
          "internalType": "int24",
          "name": "range",
          "type": "int24"
        },
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "uint128",
          "name": "liquidity",
          "type": "uint128"
        },
        {
          "internalType": "bool",
          "name": "stable",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "sBTC",
      "outputs": [
        {
          "internalType": "contract SBTC",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "sBTCPool",
      "outputs": [
        {
          "internalType": "contract IUniswapV3Pool",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "x",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "y",
          "type": "address"
        }
      ],
      "name": "setPools",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "vBTC",
      "outputs": [
        {
          "internalType": "contract VBTC",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "vBTCPool",
      "outputs": [
        {
          "internalType": "contract IUniswapV3Pool",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ] as const;