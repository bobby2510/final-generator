var sd = JSON.parse(localStorage.getItem('series_data'))
console.log(sd)
let generate_random_series = function()
{
    cs = document.getElementById('choose_series')
    cs.style.display="block"
    sp = document.getElementById('series_placer')
    series_list = []
    for(let i=0;i<sd.req_data.length;i++)
    {
        series_list.push(sd.req_data[i].code)
    }
    series_list.forEach((data,index)=>
    {
        img = document.createElement('img')
        img.src='dream11_images/'+data+'.jpg'
        img.classList.add('team-image')
        img.setAttribute('id','series_logo')
        sp.appendChild(img)
    })
    sl = document.querySelectorAll('#series_logo')
    sl.forEach((ele,index)=>
    {
        ele.addEventListener('click',()=>
        {
            sl.forEach((temp)=>
            {
                temp.classList.remove('border-grey')
            })
            ele.classList.add('border-grey')
        })
    })
    //series_continue
    sc = document.querySelector('#series_continue')
    sc.addEventListener('click',()=>
    {
        let series_index=-1
        sl.forEach((temp,index)=>
        {
           if(Array.from(temp.classList).includes('border-grey'))
            series_index=index 
        })
        if(series_index!=-1){
            cs.style.display="none"
            generate_random_teams(series_index)
        }
        else
        {
            raiseError('Should select the series')
            return
        }
    })
}
let checkTeamOne = function()
{
    let flag=-1
    teamLeft.forEach((obj,index)=>
    {
        if(Array.from(obj.classList).includes("active-team")) flag=index
    })
    return flag
}
let checkTeamTwo = function()
{
    let flag=-1
    teamRight.forEach((obj,index)=>
    {
        if(Array.from(obj.classList).includes("active-team")) flag=index
    })
    return flag
}
let generate_random_teams= function(series_index)
{
    cm = document.querySelector("#choose_match")
    cm.style.display="block"
    series = sd.req_data[series_index]
    lsp = document.querySelector('#left_side_placer')
    rsp = document.querySelector('#right_side_placer')
    sn = document.querySelector('#series_name')
    sn.textContent = sd.req_data[series_index].name
    sd.req_data[series_index].teams_list.forEach((data)=>
    {
        img = document.createElement('img')
        img.src="dream11_images/"+data+".jpg"
        img.classList.add('team-left','team-image')
        lsp.appendChild(img)
    })
    sd.req_data[series_index].teams_list.forEach((data)=>
    {
        img = document.createElement('img')
        img.src="dream11_images/"+data+".jpg"
        img.classList.add('team-right','team-image')
        rsp.appendChild(img)
    })
    teamLeft = document.querySelectorAll(".team-left")
    teamRight = document.querySelectorAll(".team-right")
    teamLeft.forEach((obj,index)=>
    {
        obj.addEventListener('click',()=>
        {
            teamLeft.forEach((temp_obj)=>
            {
                temp_obj.classList.remove('active-team')
            })
            obj.classList.add('active-team')
        })
    })
    teamRight.forEach((obj,index)=>
    {
        obj.addEventListener('click',()=>
        {
            let temp = checkTeamOne()
            if(temp!=-1){
                teamRight.forEach((temp_obj)=>
                {
                    temp_obj.classList.remove('active-team')
                })
                if(temp==index){raiseError('You cannot select same two teams!')}
                else{obj.classList.add('active-team')}
            }
            else{
                raiseError('Should Select Team One First!')
            }
        })
    })
    teamContinue = document.querySelector('.team-continue')
    teamContinue.addEventListener('click',()=>
    {
        let team1=checkTeamOne()
        let team2=checkTeamTwo()
        if(team1!=-1 && team2!=-1)
        {
            cm = document.getElementById('choose_match')
            cm.style.display="none"
            mn = document.getElementById('match_number')
            mn.style.display="block"
            match_number_control(team1,team2,series_index)
            // some changes have to be done
            
        }
        else raiseError('You Must Select Two Teams!')
    })
}
// some break
let generate_random_teams_result = function(series_index)
{
    cpd = document.querySelector("#change_player_data_panel")
    cpd.style.display="block"
    series = sd.req_data[series_index]
    cpdp = document.querySelector('#change_player_data_placer')
    sn = document.querySelector('#series_name')
    sn.textContent = sd.req_data[series_index].name
    sd.req_data[series_index].teams_list.forEach((data)=>
    {
        img = document.createElement('img')
        img.src="dream11_images/"+data+".jpg"
        img.classList.add('team-change','team-image')
        cpdp.appendChild(img)
    })
    teamChange = document.querySelectorAll(".team-change")
    teamChange.forEach((obj,index)=>
    {
        obj.addEventListener('click',()=>
        {
            teamChange.forEach((temp_obj)=>
            {
                temp_obj.classList.remove('active-team')
            })
            obj.classList.add('active-team')
        })
    })
    cpdc = document.querySelector('#change_player_data_continue')
    cpdc.addEventListener('click',()=>
    {
        
        let team_index=-1
        teamChange.forEach((temp,index)=>
        {
           if(Array.from(temp.classList).includes('active-team'))
            team_index=index 
        })
        if(team_index!=-1){
            cpd.style.display="none"
            cp = document.querySelector('#change_player')
            cp.style.display="block"
            change_player_data(team_index,series_index);
        }
        else
        {
            raiseError('Should select the team')
            return
        }
    })
}
//------------------
let generate_random_series_results = function()
{
    cs = document.getElementById('choose_series_result')
    cs.style.display="block"
    sp = document.getElementById('series_placer_result')
    series_list = []
    for(let i=0;i<sd.req_data.length;i++)
    {
        series_list.push(sd.req_data[i].code)
    }
    series_list.forEach((data,index)=>
    {
        img = document.createElement('img')
        img.src='dream11_images/'+data+'.jpg'
        img.classList.add('team-image')
        img.setAttribute('id','series_logo')
        sp.appendChild(img)
    })
    sl = document.querySelectorAll('#series_logo')
    sl.forEach((ele,index)=>
    {
        ele.addEventListener('click',()=>
        {
            sl.forEach((temp)=>
            {
                temp.classList.remove('border-grey')
            })
            ele.classList.add('border-grey')
        })
    })
    //series_continue
    scr = document.querySelector('#series_continue_result')
    scr.addEventListener('click',()=>
    {
        let series_index=-1
        sl.forEach((temp,index)=>
        {
           if(Array.from(temp.classList).includes('border-grey'))
            series_index=index 
        })
        if(series_index!=-1){
            cs.style.display="none"
           // alert(series_index)
            generate_random_teams_result(series_index)
            //change_player_data(series_index);
        }
        else
        {
            raiseError('Should select the series')
            return
        }
    })
}

//-------------------
let generate_match_result_series = function()
{
    cs = document.getElementById('match_result_series')
    cs.style.display="block"
    sp = document.getElementById('match_result_series_placer')
    series_list = []
    for(let i=0;i<sd.req_data.length;i++)
    {
        series_list.push(sd.req_data[i].code)
    }
    series_list.forEach((data,index)=>
    {
        img = document.createElement('img')
        img.src='dream11_images/'+data+'.jpg'
        img.classList.add('team-image')
        img.setAttribute('id','series_logo')
        sp.appendChild(img)
    })
    sl = document.querySelectorAll('#series_logo')
    sl.forEach((ele,index)=>
    {
        ele.addEventListener('click',()=>
        {
            sl.forEach((temp)=>
            {
                temp.classList.remove('border-grey')
            })
            ele.classList.add('border-grey')
        })
    })
    //series_continue
    sc = document.querySelector('#match_result_series_continue')
    sc.addEventListener('click',()=>
    {
        let series_index=-1
        sl.forEach((temp,index)=>
        {
           if(Array.from(temp.classList).includes('border-grey'))
            series_index=index 
        })
        if(series_index!=-1){
            cs.style.display="none"
            mrn=document.getElementById('match_result_number')
            mrn.style.display="block"
            get_match_result_number(series_index)
        }
        else
        {
            raiseError('Should select the series')
            return
        }
    })
}
