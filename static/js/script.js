window.onload =authenticate
refresh_id = document.querySelector("#refresh_id")
refresh_id.addEventListener('click',()=>
{
    localStorage.setItem('WA_teams_stored','not')
    store_teams()
    SuccessMsg('Website Updated Successfully!')
})
cpd = document.getElementById('change_player_data')
cpd.addEventListener('click',()=>
{
    fp = document.getElementById('first_panel')
    fp.style.display="none"
    generate_random_series_results()
})
choose_type = document.getElementById('choose_type')
choose_type.addEventListener('click',()=>
{
    fp= document.getElementById('first_panel')
    fp.style.display="none"
    SuccessMsg('Always Check player credits and role before generating!')
    generate_random_series()
    
})
cm = document.getElementById('custom_match')
cm.addEventListener("click",()=>{
    cp=document.getElementById('custom_panel')
    fp = document.getElementById('first_panel')
    fp.style.display="none"
    cp.style.display="block"
})
let match_number_control = function(team1,team2,series_index)
{
    mnc= document.getElementById('match_number_continue')
    mnc.addEventListener('click',()=>
    {
        mnv = document.getElementById('match_number_value')
        mnv_value = mnv.value
        if(mnv_value==null) {raiseError('Invalid Input');return}
        mn = document.getElementById('match_number')
        mn.style.display="none"
        cp = document.getElementById('choose_player')
        cp.style.display="block"
        GeneratePlayers(team1,team2,Number(mnv_value),series_index)
    })
}
let GeneratePlayers = function(team1,team2,mn,series_index)
{ 
    if(team1>team2)
    {
        let temp = team1
        team1= team2
        team2= temp
    }
    
    teams_json = sd.req_data[series_index]
    team1_data = teams_json.teams[team1]
    team2_data = teams_json.teams[team2]
    displayTeams(team1_data,team2_data,team1,team2,mn,series_index)
}
home = document.getElementById('home_id')
home.addEventListener('click',()=>
{
    location.reload()
})
let displayTeams = function(team1_data,team2_data,team1,team2,mn,series_index)
{
    role_value = ['','WK','BAT','AL','BOWL']
    let team_list=sd.req_data[series_index].teams_list
    team_one = document.getElementById('team_one')
    team_two = document.getElementById('team_two')
    team_one_head = document.getElementById('team_one_head')
    team_two_head = document.getElementById('team_two_head')
    team_one_img = document.createElement('img')
    team_two_img = document.createElement('img')
    team_one_img.src = 'dream11_images/'+team_list[team1]+".jpg"
    team_two_img.src = 'dream11_images/'+team_list[team2]+".jpg"
    team_one_img.classList.add('team-image')
    team_two_img.classList.add('team-image')

    span_one = document.createElement('span')
    span_two = document.createElement('span')
    span_one.classList.add('span_one_index')
    span_one.classList.add('span_two_index')
    span_one.textContent=team1
    span_two.textContent=team2
    span_one.style.display="none"
    span_two.style.display="none"
    team_one_head.appendChild(team_one_img)
    team_one_head.appendChild(span_one)
    team_two_head.appendChild(team_two_img)
    team_two_head.appendChild(span_one)


    
    team1_data.players.forEach((player)=>
    {
        outer_div = document.createElement('div')
        inner_div1 = document.createElement('div')
        inner_div2 = document.createElement('div')
        span_name = document.createElement('span')
        span_name.textContent=player.player_name
        span_role = document.createElement('span')
        span_role.setAttribute('id','player_role')
        span_role.textContent=role_value[player.player_role]
        span_credits = document.createElement('span')
        span_credits.textContent=player.player_credits
        inner_div2.classList.add('d-flex','justify-content-between')
        inner_div2.appendChild(span_role)
        inner_div2.appendChild(span_credits)
        inner_div1.appendChild(span_name)
        inner_div1.appendChild(inner_div2)
        inner_div1.classList.add('d-flex','selected-player-inner-div','flex-column','justify-content-center')
        var img = document.createElement('img');
        img.src = 'player_images/'+player.player_image+'.jpg';
        img.classList.add('selected-player-image')
        outer_div.appendChild(img)
        outer_div.appendChild(inner_div1)
        outer_div.classList.add('d-flex','selected-player-outer-div','justify-content-between','align-items-center','border-grey','team_one_data')
        team_one.appendChild(outer_div)
    })
    team2_data.players.forEach((player)=>
    {
        outer_div = document.createElement('div')
        inner_div1 = document.createElement('div')
        inner_div2 = document.createElement('div')
        span_name = document.createElement('span')
        span_name.textContent=player.player_name
        span_role = document.createElement('span')
        span_role.setAttribute('id','player_role')
        span_role.textContent=role_value[player.player_role]
        span_credits = document.createElement('span')
        span_credits.textContent=player.player_credits
        inner_div2.classList.add('d-flex','justify-content-between')
        inner_div2.appendChild(span_role)
        inner_div2.appendChild(span_credits)
        inner_div1.appendChild(span_name)
        inner_div1.appendChild(inner_div2)
        inner_div1.classList.add('d-flex','selected-player-inner-div','flex-column','justify-content-center')
        var img = document.createElement('img');
        img.src = 'player_images/'+player.player_image+'.jpg';
        img.classList.add('selected-player-image')
        outer_div.appendChild(img)
        outer_div.appendChild(inner_div1)
        outer_div.classList.add('d-flex','selected-player-outer-div','justify-content-between','align-items-center','border-grey','team_two_data')
        team_two.appendChild(outer_div)
    })
select_players(team1,team2,mn,series_index)
}

