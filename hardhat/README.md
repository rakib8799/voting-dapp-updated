# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

## Required Commands

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

Or

```shell
npm init -y
npm i --save-dev hardhat
npm i --save-dev @nomicfoundation/hardhat-toolbox
npx hardhat


# npm i dotenv

# .env:

# RPC_URL="https://rpc-mumbai.maticvigil.com"
# PRIVATE_KEY="aa2e2598b0f8905d3d16c84c299c003c7df89272a520358a220f781b4aae35bf"
# API_KEY="6R1N6RIBN57XPXF7IX37GE9MG9RPMSMRF2"

npx hardhat compile

npx hardhat run scripts/deploy.js --network mumbai
(will generate a contract_address)

npx hardhat verify --network mumbai (contract_address)
```

```
Secret Recovery Phrase:
agree couple yard like circle extend tool angry move vibrant floor head

Mumbai network include in browser's extension:
Network name: Mumbai
New RPC URL: https://polygon-mumbai-bor.publicnode.com
Chain ID: 80001
Currency symbol: MATIC
Block explorer URL: https://mumbai.polygonscan.com

Imported Account List:
Account1:
aa2e2598b0f8905d3d16c84c299c003c7df89272a520358a220f781b4aae35bf
2:
a4e328e89db265274df59cf11f20aaaa37c96cabb050dbd1b79093cf1c40eca8
3:
58870808d10b61b889fee64c19fa76cd4b73b6a5d82bfde5b7a0880a4bdb0b20
4:
658e4e46dca887f159653b8146cf381fb45ab86a593559ac02d0f5de05661dab
5:
537851a986ca29f4f52731f786bf97b1475c87d02ff4cf986c82c7db03e830d4
6:
0d1791ed504389039cc0ea9a2ae3fe5154ad887c7c148c19e586aff77ab4a4a5
7:
33fc3b07a3533da92ba73a2d8dbc476ba12dc6c9f5f85456243e5964c81f183a
8:
13d89fa048ef4141b530346d759cfef5fefc195c72e7868a502659a8038c6cd5
9:
e95af5527592a9e504da68713cf399ea56ad2b79ba6f80e3abbc50edb193a869
```

## Useful Websites

```
https://chainlist.org/?testnets=true&search=mumbai
https://faucet.polygon.technology/
https://polygonscan.com/myapikey
https://mumbaifaucet.com/
```
