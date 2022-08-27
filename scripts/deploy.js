const { ethers, network, run } = require("hardhat");

require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

async function main() {
    const contractFactory = await ethers.getContractFactory("SimpleStorage");
    console.log("deploying...");

    const deployContract = await contractFactory.deploy();
    await deployContract.deployed();

    console.log("Deployed to ", deployContract.address);
    // console.log(deployContract);

    // awwait chainId transaction verify

    //store sth
    if (network.config.chainId === 4 && process.env.ETHERSCAN_APIKEY) {
        await deployContract.deployTransaction.wait(1);
        await verify(deployContract.address, []);
    }
    const retriveNumeero = await deployContract.retrieve();
    console.log(retriveNumeero);
    const setNumero = await deployContract.store(99931);
    await setNumero.wait(1);
    const nouvelNumero = await deployContract.retrieve();
    console.log(nouvelNumero);
}

async function verify(contractAddress, args) {
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        });
    } catch (e) {
        if (e.message.toLowerCase("already verified")) {
            console.log("Already Verified");
        } else {
            console.log(e);
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit = 1;
    });