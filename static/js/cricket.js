let authenticate = function()
{
    let main_flag = localStorage.getItem('cricket')
    let sub_flag_one = localStorage.getItem('num1')
    let sub_flag_two = localStorage.getItem('num2')
    if(main_flag=='present' && sub_flag_one=='13' && sub_flag_two=='91')
    {
        fp = document.querySelector('#first_panel')
        fp.style.display="block"
        ap = document.querySelector('#auth_panel')
        ap.style.display="none"
        store_teams()
    }
    else
    {
        auth_btn=document.querySelector('#auth_btn')
        auth_btn.addEventListener('click',()=>
        {
            mobile_number = document.querySelector('#mobile_number')
            mn=mobile_number.value
            if(mn==''){raiseError('mobile number cannot be empty!'); return}
            secret_code = document.querySelector('#secret_code')
            sc=Number(secret_code.value)
            if(sc==''){raiseError('secret code cannot be empty!'); return}
            system_code= get_code(Number(mn))
            if(sc==system_code)
            {
                localStorage.setItem('cricket','present')
                localStorage.setItem('num1','13')
                localStorage.setItem('num2','91')
                fp = document.querySelector('#first_panel')
                fp.style.display="block"
                ap = document.querySelector('#auth_panel')
                ap.style.display="none"
                SuccessMsg('Your account has been verified successfully!')
                store_teams()
            }
            else{
                raiseError('Invalid secret code!')
            }
        })
    }
}
let get_code = function(mn)
{
    data = ("0" + (new Date()).getDate()).slice(-2)
    mn_str= ''+mn;
    sum=0
    for(let i=0;i<mn_str.length;i++)
        sum+=parseInt(mn_str.charAt(i))
    sum=sum+''
    return Number(`${data.charAt(1)}${sum}${sum.charAt(1)}${sum.charAt(0)}${data.charAt(0)}`)
}