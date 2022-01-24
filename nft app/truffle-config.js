module.exports = {
  networks: {
    development: {
      network_id: 1337,
      host: "localhost",
      port: 8545,
    }
  },
  compilers: {
    solc: {
      version: "0.8.10",
    },
  }
};
