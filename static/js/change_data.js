let change_player_data = function(team_index,series_index)
{
    teams_data = sd.req_data[series_index]
    team = teams_data.teams[team_index]
    console.log(team)
    cpp = document.getElementById('change_player_placer')
    team.players.forEach((player,index)=>
    {
        outer_div = document.createElement('div')
        outer_div.classList.add('d-flex','justify-content-around','flex-wrap','container','border-grey','m-2','align-items-center')
        img = document.createElement('img')
        img.src='player_images/'+player.player_image+'.jpg';
        img.classList.add('selected-player-image')
        h4 = document.createElement('h6')
        h4.textContent = player.player_name
        inner_div_one = document.createElement('div')
        span_role = document.createElement('small')
        span_role.textContent="Role :"
        input_role = document.createElement('input')
        input_role.setAttribute('type','number')
        input_role.classList.add('input-change-size')
        input_role.value=player.player_role
        input_role.setAttribute('id','pr')
        inner_div_one.appendChild(span_role)
        inner_div_one.appendChild(input_role)
        inner_div_two = document.createElement('div')
        span_credits = document.createElement('small')
        span_credits.textContent="Credits :"
        input_credits = document.createElement('input')
        input_credits.setAttribute('type','number')
        input_credits.classList.add('input-change-size')
        input_credits.value = player.player_credits
        input_credits.setAttribute('id','pc')
        inner_div_two.appendChild(span_credits)
        inner_div_two.appendChild(input_credits)
        inner_div_one.classList.add('final_kvp')
        inner_div_two.classList.add('final_kvp')
        outer_div.appendChild(img)
        outer_div.appendChild(h4)
        outer_sub_div = document.createElement('div')
        outer_sub_div.classList.add('d-flex','flex-wrap','justify-content-around','align-items-center','m-2','p-2')
        outer_sub_div.appendChild(inner_div_one)
        outer_sub_div.appendChild(inner_div_two)
        outer_div.appendChild(outer_sub_div)
        cpp.appendChild(outer_div)
    })
    // just continue
    cpu = document.getElementById('change_player_update')
    cpu.addEventListener('click',()=>
    {
        pr_list = document.querySelectorAll('#pr')
        pc_list = document.querySelectorAll('#pc')
        pr_data=[]
        pc_data=[]
        pr_list.forEach((ele)=>
        {
            pr_data.push(Number(ele.value))
        })
        pc_list.forEach((ele)=>
        {
            pc_data.push(Number(ele.value))
        })
        teams_data.teams[team_index].players.forEach((player,index)=>
        {
            player.player_role=pr_data[index]
            player.player_credits=pc_data[index]
        })
        sd.req_data[series_index]=teams_data
        localStorage.setItem('series_data',JSON.stringify(sd))
        SuccessMsg('Player data updated Successfully!')
        location.reload()
    })
}