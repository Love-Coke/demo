use anchor_lang::prelude::*;

/// solana-security-txt for admin contract
use solana_security_txt::security_txt;
security_txt! {
    name: "demo",
    project_url: "https://github.com/Love-Coke/demo",
    contacts: "test",
    policy: "",
    preferred_languages: "en, cz",
    auditors: "None"
}

declare_id!("bgZzeCz71tuJxt5ByowRf7ZXYLpAAYk7ybq1AFqXXDS");

#[program]
pub mod demo {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        let my_account=&mut ctx.accounts.my_account;
        my_account.data=0;
        // Pubkey.f
        Ok(())
    }
    pub fn update(ctx: Context<Update>,data:u64)->Result<()>{
        let my_account = &mut ctx.accounts.my_account;
        my_account.data=data;
        Ok(())
    }

    pub fn increment(ctx: Context<Increment>)->Result<()>{ 
        let my_account = &mut ctx.accounts.my_account;
        my_account.data+=1;
        Ok(())
    }

    pub fn decrement(ctx: Context<Decrement>)->Result<()>{
        let my_account = &mut ctx.accounts.my_account;
        my_account.data-=1;  
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
     #[account(init,payer=user,space=8+16)]
     pub my_account:Account<'info,MyAccount>,
     #[account(mut)]
     pub user:Signer<'info>,
     pub system_program:Program<'info,System>,
}

#[derive(Accounts)]
pub struct  Update<'info>{
    #[account(mut)]
    pub my_account:Account<'info,MyAccount> 
}

#[derive(Accounts)]
pub struct  Increment<'info>{
    #[account(mut)]
    pub my_account:Account<'info,MyAccount> 
}

#[derive(Accounts)]
pub struct  Decrement<'info>{
    #[account(mut)]
    pub my_account:Account<'info,MyAccount> 
}

#[account]
pub struct  MyAccount{
   pub data:u64,
}