import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Calculator } from "../target/types/calculator";
import { assert } from "chai";

describe("calculator", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());
  const newAccount  = anchor.web3.Keypair.generate();

  const program = anchor.workspace.calculator as Program<Calculator>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods
    .init(10)
    .accounts({
      signer:anchor.getProvider().wallet.publicKey,
      account:newAccount.publicKey
    })
    .signers([newAccount])
    .rpc();
    const account = await program.account.dataShape.fetch(newAccount.publicKey)
    console.log("account",account)
    console.log("Your transaction signature", tx);
    assert(account.data == 10)
  });
  it("Is doubling!", async () => {
    // Add your test here.
    const tx = await program.methods
    .double()
    .accounts({
      signer:anchor.getProvider().wallet.publicKey,
      account:newAccount.publicKey
    })
    .rpc();
    const account = await program.account.dataShape.fetch(newAccount.publicKey)
    console.log("account",account)
    console.log("Your transaction signature", tx);
    assert(account.data == 20)
  });
  it("Is adding!", async () => {
    // Add your test here.
    const tx = await program.methods
    .add(20)
    .accounts({
      signer:anchor.getProvider().wallet.publicKey,
      account:newAccount.publicKey
    })
    .rpc();
    const account = await program.account.dataShape.fetch(newAccount.publicKey)
    console.log("account",account)
    console.log("Your transaction signature", tx);
    assert(account.data == 40)
  });
});
