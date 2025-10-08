use anchor_lang::prelude::*;

declare_id!("AVC8dX4GTfXT1S1Tsee9VXFjRYJbujZrBj9sLDWSjBBb");

#[program]
pub mod calculator {
    use super::*;

    pub fn init(ctx:Context<Initialize>,init_value:u32)-> Result<()>{
        ctx.accounts.account.data = init_value;
       Ok(())
    }
    pub fn double(ctx:Context<Double>)->Result<()>{
        ctx.accounts.account.data = ctx.accounts.account.data * 2;
        Ok(())
    }
    pub fn add(ctx:Context<Add>,input_value:u32)->Result<()>{
        ctx.accounts.account.data = ctx.accounts.account.data + input_value;
        Ok(())
    }
}
#[account]
pub struct DataShape {
   pub data:u32
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init,payer=signer,space=8+4)]
    pub account:Account<'info,DataShape>,
    pub system_program:Program<'info,System>,
    #[account(mut)]
    pub signer:Signer<'info>
}
#[derive(Accounts)]
pub struct Double<'info> {
    #[account(mut)]
    pub account:Account<'info,DataShape>,
    #[account(mut)]
    pub signer:Signer<'info>
}
#[derive(Accounts)]
pub struct Add<'info>{
    #[account(mut)]
    pub account:Account<'info,DataShape>,
    #[account(mut)]
    pub signer:Signer<'info>
}