let select_players = function(team1,team2,mn,series_index)
{
team_list = sd.req_data[series_index].teams_list
team_one_data = document.querySelectorAll('.team_one_data')
team_two_data = document.querySelectorAll('.team_two_data')
team_one_data.forEach((obj)=>
{
    obj.addEventListener('click',()=>
    {
        if(Array.from(obj.classList).includes('border-grey'))
        {
            obj.classList.remove('border-grey')
            obj.classList.add('border-green')
        }
        else{
            obj.classList.remove('border-green')
            obj.classList.add('border-grey')
        }
    })
})
team_two_data.forEach((obj)=>
{
    obj.addEventListener('click',()=>
    {
        if(Array.from(obj.classList).includes('border-grey'))
        {
            obj.classList.remove('border-grey')
            obj.classList.add('border-green')
        }
        else{
            obj.classList.remove('border-green')
            obj.classList.add('border-grey')
        }
    })
})
// lets validate befoe doing that 
submit_players = document.getElementById('submit_players')
submit_players.addEventListener('click',()=>
{
    let wk_cnt=0
    let bat_cnt=0
    let bowl_cnt=0
    let al_cnt=0
    let team_one_cnt=0
    let team_two_cnt=0
    let index_one=[]
    let index_two=[]
    team_one_data.forEach((obj,index)=>
    {
        if(Array.from(obj.classList).includes('border-green')){
            team_one_cnt+=1
            index_one.push(index)
           let temp = obj.querySelector('#player_role').textContent
           if(temp =='WK') wk_cnt++
           else if(temp=='BAT') bat_cnt++
           else if(temp == 'BOWL') bowl_cnt++
           else al_cnt++
        }
    })
    team_two_data.forEach((obj,index)=>
    {
        if(Array.from(obj.classList).includes('border-green')){
            team_two_cnt+=1
            index_two.push(index)
           let temp = obj.querySelector('#player_role').textContent
           if(temp =='WK') wk_cnt++
           else if(temp=='BAT') bat_cnt++
           else if(temp == 'BOWL') bowl_cnt++
           else al_cnt++
        }
    })
    if(team_one_cnt<8 || team_two_cnt<8){raiseError('you should select atleast 8 players from each team!'); return}
    if(wk_cnt<1){raiseError('there should be atleast 1 wicket keeper'); return }
    if(bat_cnt<3){raiseError('there should be atleast 3 batsman'); return }
    if(bowl_cnt<3){raiseError('there should be atleast 3 bowlers'); return }
    if(al_cnt<1){raiseError('there should be atleast 1 alrounder '); return }
    console.log(index_one)
    console.log(index_two)
    cp = document.querySelector('#choose_player')
    cp.style.display="none"
    get_fixed_players(team1,team2,index_one,index_two,series_index)
    sfp = document.getElementById('submit_fixed_players')
    sfp.addEventListener('click',()=>
    {
            // i want to do something here
            fixed_team_one_players=[]
            fixed_team_two_players=[]
            fixed_cnt=0
            ftod = document.querySelectorAll('.fixed_team_one_data')
            ftod.forEach((obj,index)=>
            {
                //console.log(obj)
                if(Array.from(obj.classList).includes('border-pink')){
                    fixed_team_one_players.push(Number(obj.querySelector('#p_index').textContent))
                    //console.log(obj.querySelector('#span_name').textContent)
                    fixed_cnt++
                }
            })
            fttd = document.querySelectorAll('.fixed_team_two_data')
            fttd.forEach((obj,index)=>
            {
                if(Array.from(obj.classList).includes('border-pink')){
                    fixed_team_two_players.push(Number(obj.querySelector('#p_index').textContent))
                   // console.log(obj.querySelector('#span_name').textContent)
                   fixed_cnt++
                }
                   
            })
            if(fixed_cnt>9){raiseError('you cannont select more than 9');return}
            fp = document.getElementById('fixed_player')
            fp.style.display="none"
            get_captain_players(team1,team2,index_one,index_two,series_index)
            scp = document.getElementById('submit_captain_players')
            captain_cnt=0
            scp.addEventListener('click',()=>
            {
                captain_team_one_players=[]
                captain_team_two_players=[]
                stod = document.querySelectorAll('.captain_team_one_data')
                stod.forEach((obj,index)=>
                {
                    if(Array.from(obj.classList).includes('border-orange')){
                        captain_team_one_players.push(Number(obj.querySelector('#p_index').textContent))
                        captain_cnt++
                    }

                })
                sttd = document.querySelectorAll('.captain_team_two_data')
                sttd.forEach((obj,index)=>
                {
                    if(Array.from(obj.classList).includes('border-orange')){
                        captain_team_two_players.push(Number(obj.querySelector('#p_index').textContent))
                        captain_cnt++
                    }

                })
                if(captain_cnt<1){raiseError('Atleast select two player'); return}
                cp = document.getElementById('captain_panel')
                cp.style.display="none"
                // start the vice
                get_vice_captain_players(team1,team2,index_one,index_two,series_index)
                svcp = document.getElementById('submit_vice_captain_players')
                vice_captain_cnt=0
                svcp.addEventListener('click',()=>
                {
                    vice_captain_team_one_players=[]
                    vice_captain_team_two_players=[]
                    vtod = document.querySelectorAll('.vice_captain_team_one_data')
                    vtod.forEach((obj,index)=>
                    {
                        if(Array.from(obj.classList).includes('border-purple')){
                            vice_captain_team_one_players.push(Number(obj.querySelector('#p_index').textContent))
                            vice_captain_cnt++
                        }

                    })
                    vttd = document.querySelectorAll('.vice_captain_team_two_data')
                    vttd.forEach((obj,index)=>
                    {
                        if(Array.from(obj.classList).includes('border-purple')){
                            vice_captain_team_two_players.push(Number(obj.querySelector('#p_index').textContent))
                            vice_captain_cnt++
                        }

                    })
                    if(vice_captain_cnt<1){raiseError('Atleast select two player'); return}
                    vcp = document.getElementById('vice_captain_panel')
                    vcp.style.display="none"
                    ts = document.getElementById('team_side')
                    ts.style.display="block"
                    tsd = document.querySelectorAll('#team_side_data')
                    tsd.forEach((element)=>
                    {
                        element.addEventListener('click',()=>
                        {
                            if(Array.from(element.classList).includes('border-grey'))
                            {
                                element.classList.remove('border-grey')
                                element.classList.add('border-lime')
                            }
                            else{
                                element.classList.remove('border-lime')
                                element.classList.add('border-grey')
                            }
                        })
                    })
                    tol = document.querySelector('#team_one_label')
                    ttl = document.querySelector('#team_two_label')
                    tol.textContent=`Team one ${team_list[team1]}`
                    ttl.textContent=`Team two ${team_list[team2]}`
                    tsc=document.getElementById('team_side_continue')
                    //console.log(tso_value,tst_value)
                    tsc.addEventListener('click',()=>
                    {
                        selected_tsd=[]
                        tsd.forEach((element,index)=>
                        {
                            if(Array.from(element.classList).includes('border-lime'))
                                selected_tsd.push(index)
                        })
                        if(selected_tsd.length<1)
                        {
                            raiseError('Select Atleast one!')
                            return;
                        }
                        ts.style.display="none"
                        cr = document.getElementById('credit_range')
                        cr.style.display="block"
                        crc =document.getElementById('credit_range_continue')
                        crc.addEventListener('click',()=>
                        {
                            csv=document.getElementById('credit_start_value').value
                            cev=document.getElementById('credit_end_value').value
                            if(csv=='' || cev=='' || Number(cev)-Number(csv)<0 || Number(cev)>100) {raiseError('Invalid Credit Range');return}
                            cr.style.display="none"
                            console.log(selected_tsd)
                            team_generator(index_one,index_two,team1,team2,mn,csv,cev,fixed_team_one_players,fixed_team_two_players,captain_team_one_players,captain_team_two_players,vice_captain_team_one_players,vice_captain_team_two_players,selected_tsd,series_index)
                        })
                    })
                })
    
            })
            
    })
    
})

}
