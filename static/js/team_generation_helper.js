let display_teams = function(mn,attempt_index,toi,tti,series_index,attempt_id)
{
    let temp = localStorage.getItem(`${sd.req_data[series_index].code}_${series_index}_${mn}`)
    if(temp==null)
    {
        raiseError('No Match Found with given match number!')
        fp = document.getElementById('first_panel')
        if(fp!=null)
        fp.style.display="block"
    }
    tv= document.getElementById('teams_vp')
    tv.style.display="block"
    obj = JSON.parse(temp)
    obj.attempts.forEach((attempt,index)=>
    {
       if(index == attempt_index)
       {
           display_teams_helper(attempt.team_list,toi,tti,series_index,mn,attempt_id)
       }
    })
}
let display_teams_helper = function(team_list,toi,tti,series_index,mn,attempt_id)
{
    team_placer = document.getElementById('team_placer')
    //-----------------------
    span_mn = document.createElement('span')
    span_mn.textContent=mn
    span_mn.setAttribute('id','span_mn')
    span_mn.style.display="none"
    //---
    span_attempt_id = document.createElement('span')
    span_attempt_id.textContent=attempt_id
    span_attempt_id.setAttribute('id','span_attempt_id')
    span_attempt_id.style.display="none"
    //---
    span_series_index = document.createElement('span')
    span_series_index.textContent=series_index
    span_series_index.setAttribute('id','span_series_index')
    span_series_index.style.display="none"
    //------------------------
    team_placer.appendChild(span_mn)
    team_placer.appendChild(span_attempt_id)
    team_placer.appendChild(span_series_index)
    team_list.forEach((team)=>
    {
        created_team = get_11_memebers(team,toi,tti,series_index)
        team_placer.appendChild(created_team)
    })
}
let get_11_memebers = function(team,toi,tti,series_index)
{ 
    teams_data_obj = sd.req_data[series_index]
    team1 = teams_data_obj.teams[team.team_one_index].players
    team2 = teams_data_obj.teams[team.team_two_index].players
    selected_players =[]
    team.selected_team_one.forEach((sto_index)=>
    {
        selected_players.push(team1[sto_index])
    })
    team.selected_team_two.forEach((stt_index)=>
    {
        selected_players.push(team2[stt_index])
    })
    //console.log(selected_players)
    wk=[]
    bat=[]
    al=[]
    bowl=[]
    selected_players.forEach((player)=>
    {
        if(player.player_role==1) wk.push(player)
        else if(player.player_role==2) bat.push(player)
        else if(player.player_role==3) al.push(player)
        else bowl.push(player)
    })
    return final_team_creation(wk,bat,al,bowl,team.captain,team.vice_captain,team.team_number,team.team_credits,0,toi,tti)
}

let final_team_creation = function(wk,bat,al,bowl,captain,vice_captain,team_number,credits,vp,toi,tti)
{
    final_outer_div = document.createElement('div')
    final_outer_div.classList.add('d-flex','flex-column','justify-content-start')
    inner_outer_div = document.createElement('div')
    inner_outer_div.classList.add('d-flex','mt-2','justify-content-between','align-items-center')
    span_team_number =document.createElement('h6')
    span_team_credits =document.createElement('h6')
    span_team_number.textContent=`Team No : ${team_number}`
    if(vp==0)
    span_team_credits.textContent=`Credits : ${credits}`
    else 
    span_team_credits.textContent=`Points : ${credits}`
    inner_outer_div.appendChild(span_team_number)
    inner_outer_div.appendChild(span_team_credits)
    outer_div = document.createElement('div')
    outer_div.classList.add('mb-4','cricket-bg-style','d-flex','flex-column','justify-content-around')
    outer_div.style.backgroundImage="url('dream11_images/ground.jpg')"

    //creating wicket keeper
    wk_div = document.createElement('div')
    wk_div.classList.add('mt-2','d-flex','layout-style','justify-content-around','flex-wrap','align-items-center')
    wk.forEach((player)=>
    {
        wk_sub_div = document.createElement('div')
        wk_sub_div.style.position="relative"
        if(player.player_id==captain)
        {
            span_ele = document.createElement('span')
            span_ele.classList.add('captain')
            span_ele.textContent='c'
            wk_sub_div.appendChild(span_ele)
        }
        else if(player.player_id==vice_captain)
        {
            span_ele = document.createElement('span')
            span_ele.classList.add('vice-captain')
            span_ele.textContent='vc'
            wk_sub_div.appendChild(span_ele)
        }
        p_img = document.createElement('img')
        p_img.src='player_images/'+player.player_image+'.jpg';
        p_img.classList.add('player-image')
        wk_sub_div.appendChild(p_img)
        p_p = document.createElement('p')
        p_p.textContent = player.player_name
        if(player.player_team_index==toi)
        p_p.classList.add('player-name-black')
        else
        p_p.classList.add('player-name')
        wk_sub_div.appendChild(p_p)
        wk_div.appendChild(wk_sub_div)
    })
    //creating batsman keeper
    bat_div = document.createElement('div')
    bat_div.classList.add('mt-2','layout-style','d-flex','justify-content-around','flex-wrap','align-items-center')
    bat.forEach((player)=>
    {
        bat_sub_div = document.createElement('div')
        bat_sub_div.style.position="relative"
        if(player.player_id==captain)
        {
            span_ele = document.createElement('span')
            span_ele.classList.add('captain')
            span_ele.textContent='c'
            bat_sub_div.appendChild(span_ele)
        }
        else if(player.player_id==vice_captain)
        {
            span_ele = document.createElement('span')
            span_ele.classList.add('vice-captain')
            span_ele.textContent='vc'
            bat_sub_div.appendChild(span_ele)
        }
        p_img = document.createElement('img')
        p_img.src='player_images/'+player.player_image+'.jpg';
        p_img.classList.add('player-image')
        bat_sub_div.appendChild(p_img)
        p_p = document.createElement('p')
        p_p.textContent = player.player_name
        if(player.player_team_index==toi)
        p_p.classList.add('player-name-black')
        else
        p_p.classList.add('player-name')
        bat_sub_div.appendChild(p_p)
        bat_div.appendChild(bat_sub_div)
    })
    //creating alrounder keeper
    al_div = document.createElement('div')
    al_div.classList.add('mt-2','layout-style','d-flex','justify-content-around','flex-wrap','align-items-center')
    al.forEach((player)=>
    {
        al_sub_div = document.createElement('div')
        al_sub_div.style.position="relative"
        if(player.player_id==captain)
        {
            span_ele = document.createElement('span')
            span_ele.classList.add('captain')
            span_ele.textContent='c'
            al_sub_div.appendChild(span_ele)
        }
        else if(player.player_id==vice_captain)
        {
            span_ele = document.createElement('span')
            span_ele.classList.add('vice-captain')
            span_ele.textContent='vc'
            al_sub_div.appendChild(span_ele)
        }
        p_img = document.createElement('img')
        p_img.src='player_images/'+player.player_image+'.jpg';
        p_img.classList.add('player-image')
        al_sub_div.appendChild(p_img)
        p_p = document.createElement('p')
        p_p.textContent = player.player_name
        if(player.player_team_index==toi)
        p_p.classList.add('player-name-black')
        else
        p_p.classList.add('player-name')
        al_sub_div.appendChild(p_p)
        al_div.appendChild(al_sub_div)
    })
    //creating bowler keeper
    bowl_div = document.createElement('div')
    bowl_div.classList.add('mt-2','layout-style','d-flex','justify-content-around','flex-wrap','align-items-center')
    bowl.forEach((player)=>
    {
        bowl_sub_div = document.createElement('div')
        bowl_sub_div.style.position="relative"
        if(player.player_id==captain)
        {
            span_ele = document.createElement('span')
            span_ele.classList.add('captain')
            span_ele.textContent='c'
            bowl_sub_div.appendChild(span_ele)
        }
        else if(player.player_id==vice_captain)
        {
            span_ele = document.createElement('span')
            span_ele.classList.add('vice-captain')
            span_ele.textContent='vc'
            bowl_sub_div.appendChild(span_ele)
        }
        p_img = document.createElement('img')
        p_img.src='player_images/'+player.player_image+'.jpg';
        p_img.classList.add('player-image')
        bowl_sub_div.appendChild(p_img)
        p_p = document.createElement('p')
        p_p.textContent = player.player_name
        if(player.player_team_index==toi)
        p_p.classList.add('player-name-black')
        else
        p_p.classList.add('player-name')
        bowl_sub_div.appendChild(p_p)
        bowl_div.appendChild(bowl_sub_div)
    })
    outer_div.appendChild(wk_div)
    outer_div.appendChild(bat_div)
    outer_div.appendChild(al_div)
    outer_div.appendChild(bowl_div)
    final_outer_div.appendChild(inner_outer_div)
    final_outer_div.appendChild(outer_div)
    return final_outer_div
}

