import "core-js/stable";
import "regenerator-runtime/runtime";
import { waitForAppScreen, zemu, genericTx, SPECULOS_ADDRESS, RANDOM_ADDRESS, txFromEtherscan } from './test.fixture';
import { ethers } from "ethers";
import { parseEther, parseUnits } from "ethers/lib/utils";

const contractAddr = "0x7be8076f4ea4a4ad08075c2508e481d6c946d12b";
const pluginName = "opensea";
const abi_path = `../${pluginName}/abis/` + contractAddr + '.json';
const abi = require(abi_path);

// from https://etherscan.io/tx/0x0a863562ee39b566d2eac1d11f0bcefab4fac12c26dc300fa8ad0df3a142afad
test('[Nano S] atomicMatch single Eth, no warning', zemu("nanos", async (sim, eth) => {
  const serializedTx = txFromEtherscan("0x02f909da01288459682f00851fb1117a6983048ba4947be8076f4ea4a4ad08075c2508e481d6c946d12b8803544bc7699dc000b90964ab834bab0000000000000000000000007be8076f4ea4a4ad08075c2508e481d6c946d12b0000000000000000000000005b1a00402c6aabc799aa30d009fb26ec7980ba0a0000000000000000000000001b33b9d0322d84434cc217c76611902515db8b5c0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000bd4455da5929d5639ee098abfaa3241e9ae111af000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000007be8076f4ea4a4ad08075c2508e481d6c946d12b0000000000000000000000001b33b9d0322d84434cc217c76611902515db8b5c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000005b3256965e7c3cf26e11fcaf296dfc8807c01073000000000000000000000000bd4455da5929d5639ee098abfaa3241e9ae111af0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004b000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003544bc7699dc000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000615ee5230000000000000000000000000000000000000000000000000000000000000000868eafdfe2c6c007d65a7d28b4465db1874b404b85c1a1b0beedfc99ea95feec00000000000000000000000000000000000000000000000000000000000004b000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003544bc7699dc000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000615edd760000000000000000000000000000000000000000000000000000000061602f3442dd9c6e64919f8eab37953ea61a908e88263c5ae9cc95235a2132ae58390aa90000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006a0000000000000000000000000000000000000000000000000000000000000074000000000000000000000000000000000000000000000000000000000000007e0000000000000000000000000000000000000000000000000000000000000088000000000000000000000000000000000000000000000000000000000000009200000000000000000000000000000000000000000000000000000000000000940000000000000000000000000000000000000000000000000000000000000001c000000000000000000000000000000000000000000000000000000000000001c7b8fc5efce71806fbd743448ef59f2ddbc5532dd74d5f4bb410a9d4cfae908475c6d9c246b7e4a8bd0d3f810f70015a4f95cf02530b13bb6510e3115907bf6b17b8fc5efce71806fbd743448ef59f2ddbc5532dd74d5f4bb410a9d4cfae908475c6d9c246b7e4a8bd0d3f810f70015a4f95cf02530b13bb6510e3115907bf6b10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006423b872dd00000000000000000000000000000000000000000000000000000000000000000000000000000000000000005b1a00402c6aabc799aa30d009fb26ec7980ba0a000000000000000000000000000000000000000000000000000000000000194700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006423b872dd0000000000000000000000001b33b9d0322d84434cc217c76611902515db8b5c0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000194700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006400000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000064000000000000000000000000000000000000000000000000000000000000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c001a0c3002685040139688670f9024ae7379987c4746b4776ebdbf714d2a28503087fa01dae01bc11fd28525711e6cd19ce58c042b6b07a6121d19056a91507a0595a27");
  const tx = eth.signTransaction(
    "44'/60'/0'/0",
    serializedTx,
  );
  await waitForAppScreen(sim);
  await sim.navigateAndCompareSnapshots('.', 'nanos_atomic_match_single_eth_no_warning', [11, 0]);
  await tx;
}));

// from https://etherscan.io/tx/0xfb7ea354650bf5c5dcb84340c9da9ec092bf296a1ff81302da9d449c086bdbac
test('[Nano S] atomicMatch single Weth, no warning', zemu("nanos", async (sim, eth) => {
  const serializedTx = txFromEtherscan("0x02f909d4018201b98477359400852388f99c508305b632947be8076f4ea4a4ad08075c2508e481d6c946d12b80b90964ab834bab0000000000000000000000007be8076f4ea4a4ad08075c2508e481d6c946d12b000000000000000000000000d15a3cddebd2f841b9fb7e213ee9df89577fba0500000000000000000000000000000000000000000000000000000000000000000000000000000000000000005b3256965e7c3cf26e11fcaf296dfc8807c0107300000000000000000000000073883743dd9894bd2d43e975465b50df8d3af3b20000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000007be8076f4ea4a4ad08075c2508e481d6c946d12b0000000000000000000000009086b1f411cb815197c01abffe9277ad2a30ca8e000000000000000000000000d15a3cddebd2f841b9fb7e213ee9df89577fba05000000000000000000000000000000000000000000000000000000000000000000000000000000000000000073883743dd9894bd2d43e975465b50df8d3af3b20000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003520000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008251670c2ad4000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000615eb363000000000000000000000000000000000000000000000000000000006160054360f4800b6f4d60203cad43bcf54e9a696cb004b3744fb367d2bf982bcae46d42000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003520000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008251670c2ad4000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000615efb5900000000000000000000000000000000000000000000000000000000000000000161ed3b01f05c59fbd857d14013f4c6becb462f2688fc2aa4f37e256dcede2e0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006a0000000000000000000000000000000000000000000000000000000000000074000000000000000000000000000000000000000000000000000000000000007e0000000000000000000000000000000000000000000000000000000000000088000000000000000000000000000000000000000000000000000000000000009200000000000000000000000000000000000000000000000000000000000000940000000000000000000000000000000000000000000000000000000000000001b000000000000000000000000000000000000000000000000000000000000001bd2c3fdf5ac1239c39a4ae42f9d4e3662fc235c61dc46f5cd182c8df93c2de3902fc874e3f98d22e07381a7fb86a96acfa4f0837383eb2aa6b752569347dbe845d2c3fdf5ac1239c39a4ae42f9d4e3662fc235c61dc46f5cd182c8df93c2de3902fc874e3f98d22e07381a7fb86a96acfa4f0837383eb2aa6b752569347dbe8450000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006423b872dd0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000d15a3cddebd2f841b9fb7e213ee9df89577fba05000000000000000000000000000000000000000000000000000000000000148a00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006423b872dd0000000000000000000000009086b1f411cb815197c01abffe9277ad2a30ca8e0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000148a00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006400000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000064000000000000000000000000000000000000000000000000000000000000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c080a03581f72131f9dca69c6d69e3567312d6ec9c76d7e6cddec2c9cdc5a3dbd69c68a054412fcc69ffaee92f2d82c45d26ab0561bc154fdaf04f334548729ccbcd81be");
  const tx = eth.signTransaction(
    "44'/60'/0'/0",
    serializedTx,
  );
  await waitForAppScreen(sim);
  await sim.navigateAndCompareSnapshots('.', 'nanos_atomic_match_single_weth_no_warning', [11, 0]);
  await tx;
}));

// from https://etherscan.io/tx/0xfb7ea354650bf5c5dcb84340c9da9ec092bf296a1ff81302da9d449c086bdbac
// but WETH address is misstyped
test('[Nano S] atomicMatch single unknown, token not found', zemu("nanos", async (sim, eth) => {
  const serializedTx = txFromEtherscan("0x02f909d4018201b98477359400852388f99c508305b632947be8076f4ea4a4ad08075c2508e481d6c946d12b80b90964ab834bab0000000000000000000000007be8076f4ea4a4ad08075c2508e481d6c946d12b000000000000000000000000d15a3cddebd2f841b9fb7e213ee9df89577fba0500000000000000000000000000000000000000000000000000000000000000000000000000000000000000005b3256965e7c3cf26e11fcaf296dfc8807c0107300000000000000000000000073883743dd9894bd2d43e975465b50df8d3af3b20000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c02baa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000007be8076f4ea4a4ad08075c2508e481d6c946d12b0000000000000000000000009086b1f411cb815197c01abffe9277ad2a30ca8e000000000000000000000000d15a3cddebd2f841b9fb7e213ee9df89577fba05000000000000000000000000000000000000000000000000000000000000000000000000000000000000000073883743dd9894bd2d43e975465b50df8d3af3b20000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003520000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008251670c2ad4000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000615eb363000000000000000000000000000000000000000000000000000000006160054360f4800b6f4d60203cad43bcf54e9a696cb004b3744fb367d2bf982bcae46d42000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003520000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008251670c2ad4000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000615efb5900000000000000000000000000000000000000000000000000000000000000000161ed3b01f05c59fbd857d14013f4c6becb462f2688fc2aa4f37e256dcede2e0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006a0000000000000000000000000000000000000000000000000000000000000074000000000000000000000000000000000000000000000000000000000000007e0000000000000000000000000000000000000000000000000000000000000088000000000000000000000000000000000000000000000000000000000000009200000000000000000000000000000000000000000000000000000000000000940000000000000000000000000000000000000000000000000000000000000001b000000000000000000000000000000000000000000000000000000000000001bd2c3fdf5ac1239c39a4ae42f9d4e3662fc235c61dc46f5cd182c8df93c2de3902fc874e3f98d22e07381a7fb86a96acfa4f0837383eb2aa6b752569347dbe845d2c3fdf5ac1239c39a4ae42f9d4e3662fc235c61dc46f5cd182c8df93c2de3902fc874e3f98d22e07381a7fb86a96acfa4f0837383eb2aa6b752569347dbe8450000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006423b872dd0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000d15a3cddebd2f841b9fb7e213ee9df89577fba05000000000000000000000000000000000000000000000000000000000000148a00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006423b872dd0000000000000000000000009086b1f411cb815197c01abffe9277ad2a30ca8e0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000148a00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006400000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000064000000000000000000000000000000000000000000000000000000000000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c080a03581f72131f9dca69c6d69e3567312d6ec9c76d7e6cddec2c9cdc5a3dbd69c68a054412fcc69ffaee92f2d82c45d26ab0561bc154fdaf04f334548729ccbcd81be");
  const tx = eth.signTransaction(
    "44'/60'/0'/0",
    serializedTx,
  );
  await waitForAppScreen(sim);
  await sim.navigateAndCompareSnapshots('.', 'nanos_atomic_match_single_unknown_token_warning', [13, 0]);
  await tx;
}));