const anchor = require("@coral-xyz/anchor");
let pk="9ENxMQt3KCkRtgAUK7rrWEa5c9zXPiH8EaHGbmX4vBF"
// let pk=anchor.web3.Keypair.generate()
describe("demo2",() => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());
  let provider=anchor.AnchorProvider.local()
  let user = provider.wallet;
  let program = anchor.workspace.Demo;
  it.only("get balance",async ()=>{
    let balance= await provider.connection.getBalance(user.publicKey)
    console.log(balance/10**9,"user",user.publicKey)
  })

  it.only("Is initialized!", async () => {
    // Add your test here.
   
    // console.log("program",program)
    // console.log(anchor.workspace)
    //C1ngzy1esCHsv1kcWRW4tqdRtfwY6nELGyLqgwZbS84K
    let myAccount=anchor.web3.Keypair.generate()
    console.log("myAccount",myAccount.publicKey)
    const tx=await program.methods.initialize().accounts({
         myAccount: myAccount.publicKey,
         user: user.publicKey,
         systemProgram: anchor.web3.SystemProgram.programId,
     }).signers( [myAccount]).rpc()  
    console.log("Your transaction signature", tx);

    let acc=await program.account.myAccount.fetch(myAccount.publicKey)
    console.log("acc",acc)
    console.log("Your transaction signature", tx);
  });

  it.skip("increment",async ()=>{

    let wallet=new anchor.web3.PublicKey(pk)  
    console.log("account",wallet)
    const tx=await program.methods.increment().accounts({
      myAccount: wallet,
     }).rpc()
    console.log("Your transaction signature", tx);

    let acc=await program.account.myAccount.fetch(wallet)
    console.log("acc",acc)
  })


  it.skip("update",async ()=>{

    let wallet=new anchor.web3.PublicKey(pk)  
    console.log("account",wallet)
    let newValue=new anchor.BN(100)
    const tx=await program.methods.update(newValue).accounts({
      myAccount: wallet,
     }).rpc()
    console.log("Your transaction signature", tx);

    let acc=await program.account.myAccount.fetch(wallet)
    console.log("acc",acc)
  })

  it.skip("decrement",async ()=>{
    let wallet=new anchor.web3.PublicKey(pk)  
    console.log("account",wallet)
    const tx=await program.methods.decrement().accounts({
      myAccount: wallet,
     }).rpc()
    console.log("Your transaction signature", tx);
    
    var confirmedTx= await provider.connection.getTransaction(tx,"confirmed")
    console.log("confirmedTx",confirmedTx)
    let acc=await program.account.myAccount.fetch(wallet)
    console.log("acc",acc)
  })

});
