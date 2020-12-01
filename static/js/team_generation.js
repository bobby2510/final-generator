let diff_comb = [
   [1,3,2,5],[1,3,3,4],[1,4,3,3],[1,4,2,4],[1,4,1,5],[1,5,2,3],[1,5,1,4],[1,6,1,3],[1,3,1,6],[1,3,4,3],
   [2,3,3,3],[2,3,2,4],[2,3,1,5],[2,4,2,3],[2,4,1,4],[2,5,1,3],
   [3,3,2,3],[3,4,1,3],[3,3,1,4],
   [4,3,1,3],[1,2,2,6],[1,2,3,5],[1,2,4,4],[1,2,5,3],[1,2,6,2],
   [1,6,2,2],[1,5,3,2],[1,4,4,2],[1,3,5,2],
   [2,5,2,2],[2,6,1,2],[3,4,2,2],[4,3,2,2],
   [3,5,1,2],[4,4,1,2],[2,2,2,5],[3,2,1,5]
]
let team_side_list=[[4,7],[5,6],[6,5],[7,4]]
let team_generator = function(team_one,team_two,team_one_index,team_two_index,mn,csv,cev,fixed_one,fixed_two,captain_one,captain_two,vice_captain_one,vice_captain_two,selected_tsd,series_index)
{
   console.log(sd.req_data[series_index].code)
   console.log(fixed_one)
   console.log(fixed_two)
   console.log(captain_one)
   console.log(captain_two)
   console.log(vice_captain_one)
   console.log(vice_captain_two)
   teams_data = sd.req_data[series_index]
   team_one_data = teams_data.teams[team_one_index]
   team_two_data = teams_data.teams[team_two_index]
   selected_team_one = []
   selected_team_two = []
   f1_players=[]
   f2_players=[]
   c1_players=[]
   c2_players=[]
   vc1_players=[]
   vc2_players=[]
   let wk_cnt=0,bat_cnt=0,al_cnt=0,bowl_cnt=0;
      team_one_data.players.forEach((player,index)=>
      {
         if(team_one.includes(index) && fixed_one.includes(index)==false){
            selected_team_one.push(player)
            if(player.player_role==1) wk_cnt++;
            else if(player.player_role==2) bat_cnt++
            else if(player.player_role==3) al_cnt++
            else bowl_cnt++
         }
         if(fixed_one.includes(index))
         {
            f1_players.push(player)
         }
         if(captain_one.includes(index))
         {
            c1_players.push(player)
         }
         if(vice_captain_one.includes(index))
         {
            vc1_players.push(player)
         }
      })
      console.log(selected_team_one)
     // console.log(f1_players)
      team_two_data.players.forEach((player,index)=>
      {
         if(team_two.includes(index) && fixed_two.includes(index)==false){
            selected_team_two.push(player)
            if(player.player_role==1) wk_cnt++;
            else if(player.player_role==2) bat_cnt++
            else if(player.player_role==3) al_cnt++
            else bowl_cnt++
         }
         if(fixed_two.includes(index))
         {
            f2_players.push(player)
         }
         if(captain_two.includes(index))
         {
            c2_players.push(player)
         }
         if(vice_captain_two.includes(index))
         {
            vc2_players.push(player)
         }
      })
      console.log(f1_players)
      console.log(f2_players)
   custom_strategy(wk_cnt,bat_cnt,al_cnt,bowl_cnt,selected_team_one,selected_team_two,team_one_index,team_two_index,mn,csv,cev,f1_players,f2_players,c1_players,c2_players,vc1_players,vc2_players,selected_tsd,series_index)
}
let custom_strategy = function(wk_cnt,bat_cnt,al_cnt,bowl_cnt,selected_team_one,selected_team_two,team_one_index,team_two_index,mn,csv,cev,f1_players,f2_players,c1_players,c2_players,vc1_players,vc2_players,selected_tsd,series_index)
{
   c_strategy=[]
   f_wk=0
   f_bat=0
   f_al=0
   f_bowl=0
   f1_players.forEach((player)=>
   {
      if(player.player_role==1) f_wk++;
      else if(player.player_role==2) f_bat++;
      else if(player.player_role==3) f_al++;
      else f_bowl++;
   })
   f2_players.forEach((player)=>
   {
      if(player.player_role==1) f_wk++;
      else if(player.player_role==2) f_bat++;
      else if(player.player_role==3) f_al++;
      else f_bowl++;
   })
   if(f_wk>4 || f_bat>6 || f_al>6 || f_bowl>6){raiseError('invalid selection of fixed players'); return;}
   temp_diff_comb=[]
   diff_comb.forEach((comb)=>
   {
      if(comb[0]>=f_wk && comb[1]>=f_bat && comb[2]>=f_al && comb[3]>=f_bowl)
         temp_diff_comb.push(comb)
   })
   console.log(f_wk,f_bat,f_al,f_bowl)
   console.log(wk_cnt,bat_cnt,al_cnt,bowl_cnt)
   console.log(temp_diff_comb)
   temp_diff_comb.forEach((comb)=>
   {
      if(comb[0]<=wk_cnt+f_wk && comb[1]<=bat_cnt+f_bat && comb[2]<=al_cnt+f_al && comb[3]<=bowl_cnt+f_bowl)
         c_strategy.push(comb)
   })
   strat = document.getElementById('strategy')
   strat.style.display="block"
   sp = document.getElementById('strategy_placer')
   c_strategy.forEach((comb)=>
   {
      t1 = document.createElement('table')
      t1.classList.add('text-center','border-grey','strategy-style','m-4')
      t1.setAttribute('id','s_item')
      //wk
      tr_wk = document.createElement('tr')
      td_wk_1=document.createElement('td')
      td_wk_2=document.createElement('td')
      td_wk_1.classList.add('pt-2')
      td_wk_2.classList.add('pr-2','pt-2')
      wk_h6_1=document.createElement('h6')
      wk_h6_2= document.createElement('h6')
      wk_h6_1.textContent="wk"
      wk_h6_2.textContent=comb[0]
      td_wk_1.appendChild(wk_h6_1)
      td_wk_2.appendChild(wk_h6_2)
      tr_wk.appendChild(td_wk_1)
      tr_wk.appendChild(td_wk_2)
      //bat
      tr_bat = document.createElement('tr')
      td_bat_1=document.createElement('td')
      td_bat_2=document.createElement('td')
      td_bat_1.classList.add('pt-2')
      td_bat_2.classList.add('pr-2','pt-2')
      bat_h6_1=document.createElement('h6')
      bat_h6_2= document.createElement('h6')
      bat_h6_1.textContent="bat"
      bat_h6_2.textContent=comb[1]
      td_bat_1.appendChild(bat_h6_1)
      td_bat_2.appendChild(bat_h6_2)
      tr_bat.appendChild(td_bat_1)
      tr_bat.appendChild(td_bat_2)
      //al
      tr_al = document.createElement('tr')
      td_al_1=document.createElement('td')
      td_al_2=document.createElement('td')
      td_al_1.classList.add('pt-2')
      td_al_2.classList.add('pr-2','pt-2')
      al_h6_1=document.createElement('h6')
      al_h6_2= document.createElement('h6')
      al_h6_1.textContent="al"
      al_h6_2.textContent=comb[2]
      td_al_1.appendChild(al_h6_1)
      td_al_2.appendChild(al_h6_2)
      tr_al.appendChild(td_al_1)
      tr_al.appendChild(td_al_2)
      //bowl
      tr_bowl = document.createElement('tr')
      td_bowl_1=document.createElement('td')
      td_bowl_2=document.createElement('td')
      td_bowl_1.classList.add('pt-2')
      td_bowl_2.classList.add('pr-2','pt-2')
      bowl_h6_1=document.createElement('h6')
      bowl_h6_2= document.createElement('h6')
      bowl_h6_1.textContent="bowl"
      bowl_h6_2.textContent=comb[3]
      td_bowl_1.appendChild(bowl_h6_1)
      td_bowl_2.appendChild(bowl_h6_2)
      tr_bowl.appendChild(td_bowl_1)
      tr_bowl.appendChild(td_bowl_2)
      t1.appendChild(tr_wk)
      t1.appendChild(tr_bat)
      t1.appendChild(tr_al)
      t1.appendChild(tr_bowl)
      sp.appendChild(t1)
   })
   strategy_item = document.querySelectorAll('#s_item')
   strategy_item.forEach((si,index)=>
   {
      si.addEventListener('click',()=>
      {
         if(Array.from(si.classList).includes('border-grey')){
         si.classList.remove('border-grey')
         si.classList.add('border-green')}
         else{
            si.classList.remove('border-green')
         si.classList.add('border-grey')
         }
      })
   })
   selected_strategies=[]
   sc = document.getElementById('strategy_continue')
   sc.addEventListener('click',()=>
   {
      strategy_list=document.querySelectorAll('#s_item')
      strategy_list.forEach((sl,index)=>
      {
         if(Array.from(sl.classList).includes('border-green'))
            selected_strategies.push(c_strategy[index])
      })
      console.log(selected_strategies.length)
      console.log(selected_strategies[0][0],selected_strategies[0][1],selected_strategies[0][2],selected_strategies[0][3])
      if(selected_strategies.length<1){raiseError('Atleast select 1 strategy'); return}
      strat.style.display="none"
      number_panel = document.querySelector('#generate_panel')
      number_panel.style.display="block"
      team_number = document.getElementById('team_number')
      team_number.addEventListener('click',()=>
      {
      nt =  Number(document.querySelector('#number_teams').value)
      if(nt<1 || nt>10000){raiseError('Numbers of teams should be 1 - 10000 range'); return}
      team_generator_helper_one(selected_team_one,selected_team_two,team_one_index,team_two_index,nt,mn,csv,cev,selected_strategies,f1_players,f2_players,c1_players,c2_players,vc1_players,vc2_players,f_wk,f_bat,f_al,f_bowl,selected_tsd,series_index)
      })

   })

}
let team_generator_helper_one = function(st_one,st_two,toi,tti,nt,mn,csv,cev,strategy,f1_players,f2_players,c1_players,c2_players,vc1_players,vc2_players,f_wk,f_bat,f_al,f_bowl,selected_tsd,series_index)
{
   wk=[]
   bat=[]
   al=[]
   bowl=[]
   fp_wk=[]
   fp_bat=[]
   fp_al=[]
   fp_bowl=[]
   st_one.forEach((player)=>
   {
      if(player.player_role==1) wk.push(player)
      else if(player.player_role ==2) bat.push(player)
      else if(player.player_role == 3) al.push(player)
      else bowl.push(player)
   })
   st_two.forEach((player)=>
   {
      if(player.player_role==1) wk.push(player)
      else if(player.player_role ==2) bat.push(player)
      else if(player.player_role == 3) al.push(player)
      else bowl.push(player)
   })
   f1_players.forEach((player)=>
   {
      if(player.player_role==1) fp_wk.push(player)
      else if(player.player_role ==2) fp_bat.push(player)
      else if(player.player_role == 3) fp_al.push(player)
      else fp_bowl.push(player)
   })
   f2_players.forEach((player)=>
   {
      if(player.player_role==1) fp_wk.push(player)
      else if(player.player_role ==2) fp_bat.push(player)
      else if(player.player_role == 3) fp_al.push(player)
      else fp_bowl.push(player)
   })
  // console.log(fp_wk)
  // console.log(strategy)
   team_generator_helper_two(wk,bat,al,bowl,fp_wk,fp_bat,fp_al,fp_bowl,strategy,toi,tti,nt,mn,csv,cev,c1_players,c2_players,vc1_players,vc2_players,f_wk,f_bat,f_al,f_bowl,selected_tsd,series_index)
}
let validation_one = function(team,toi,tti)
{
   let team_one_cnt=0
   let team_two_cnt=0
   team.forEach((player)=>
   {
      if(player.player_team_index==toi) team_one_cnt++
      else team_two_cnt++;
   })
   if(Math.min(team_one_cnt,team_two_cnt)>=4) return true
   else return false
}
let validation_two = function(team)
{
   let sum=0
   team.forEach((player)=>
   {
      sum+=player.player_credits
   })
   return sum
}
let get_hash_value = function(team,captain_index,vice_captain_index)
{
   team.sort((x,y)=>
   {
      if(x.player_id<y.id) return -1
      else return 1
   })
   let hash=0
   team.forEach((player,index)=>
   {
      let temp = (player.player_id)*Math.pow(3,index+1)
      if(player.player_id==captain_index)
         temp=temp*5
      if(player.player_id==vice_captain_index)
         temp=temp*3
      hash+=temp
   })
   return hash
}
let is_valid_team_side_count = function(team,tso_value,tst_value,toi,tti)
{
   let cnt_one=0
   let cnt_two=0
   team.forEach((player)=>
   {
      if(player.player_team_index==toi)
      cnt_one++
      else 
      cnt_two++
   })
   if(cnt_one==tso_value && cnt_two==tst_value) 
      return true
   else 
      return false
}
let team_generator_helper_two = function(wk,bat,al,bowl,fp_wk,fp_bat,fp_al,fp_bowl,strategy,toi,tti,nt,mn,csv,cev,c1_players,c2_players,vc1_players,vc2_players,f_wk,f_bat,f_al,f_bowl,selected_tsd,series_index)
{
   console.log(selected_tsd.length)
   let strategy_len = strategy.length
   console.log(strategy_len)
   let hashmap = []
   let temp_cnt =0
   let codervp_cnt=0
   let team_list=[]
   let dp=0
   let selected_tsd_cnt=selected_tsd.length
   let split_arr = []
   for(let i=0;i<selected_tsd_cnt;i++)
      split_arr.push(parseInt(nt/selected_tsd_cnt))
   console.log(selected_tsd)
   console.log(split_arr)
   split_arr[0]=split_arr[0]+(nt%selected_tsd_cnt)
   let map_cnt=0;
   console.log(split_arr)
   //selected_tsd.forEach((data,index)=>
   for(let index=0;index<selected_tsd.length;index++)
   {
       temp_nt = split_arr[index]
       console.log(temp_nt)
       cnt=0
     // console.log(data)
      let tso_value = team_side_list[selected_tsd[index]][0]
      let tst_value = team_side_list[selected_tsd[index]][1]
      // console.log(tso_value)
      //console.log(tst_value)
      while(cnt<temp_nt)
      {
         if(dp>100000){raiseError('Software is short of Combinations!'); return }
         strategy_index =get_rand_value(strategy_len)
       // console.log(strategy_index)
        // console.log(strategy_len)
         //console.log(wk,bat,al,bowl,fp_wk,fp_bat,fp_al,fp_bowl)
         let team = get_team(wk,bat,al,bowl,fp_wk,fp_bat,fp_al,fp_bowl,strategy[strategy_index],f_wk,f_bat,f_al,f_bowl)
        // console.log(team)
         desperate=is_valid_team_side_count(team,tso_value,tst_value,toi,tti)
         //console.log(desperate)
         if(!desperate){dp++; continue;}
        // console.log('suspect')
         let credits = validation_two(team)
         //console.log(credits)
         let flag_one=validation_one(team,toi,tti)
         //console.log(flag_one)
         if(flag_one && credits >=csv && credits <=cev)
         {
            c_p=[]
            vc_p=[]
           
            c1_players.forEach((player)=>{c_p.push(player.player_id)})
            c2_players.forEach((player)=>{c_p.push(player.player_id)})
            vc1_players.forEach((player)=>{vc_p.push(player.player_id)})
            vc2_players.forEach((player)=>{vc_p.push(player.player_id)})
            s_vp=[]
            team.forEach((player)=>{s_vp.push(player.player_id)})
            final_c=[]
            final_vc=[]
            s_vp.forEach((data)=>{
               if(c_p.includes(data)) final_c.push(data)
            })
            s_vp.forEach((data)=>{
               if(vc_p.includes(data)) final_vc.push(data)
            })
            if(final_c.length<1){dp++;continue;}
           // console.log('suspect 1')
            if(final_vc.length<1){dp++;continue;}
           // console.log('suspect 2')
            let captain_id = null
            let vice_captain_id=null
            if(final_vc.length==1)
            {
               if(final_c.includes(final_vc[0])){dp++; continue}
            }
            while(true)
            {
               if(captain_id==null)
               {
                  let flag_c = get_rand_value(final_c.length)
                  captain_id=final_c[flag_c]
               }
               else
               {
                  let flag_vc=get_rand_value(final_vc.length)
                  if(final_vc[flag_vc]!=captain_id)
                  {
                     vice_captain_id=final_vc[flag_vc];
                     break;
                  }
               }  
            }
            //console.log(team)
            // till now we have found the complete team
            let hash_value = get_hash_value(team,captain_id,vice_captain_id)
            let flag = hashmap.indexOf(hash_value)
         // console.log(hash_value,flag)
         // console.log(hashmap)
            if(flag!=-1) map_cnt++
            if(flag==-1)
            {
               team_obj = create_team(team,toi,tti,captain_id,vice_captain_id,codervp_cnt+1,credits)
               team_list.push(team_obj)
               hashmap.push(hash_value)
               cnt++
               codervp_cnt++
            }
         }
         dp++
      }
   }
   console.log(dp)
  // console.log(map_cnt)
   // all teams are stored
   let attempt_id = Number(localStorage.getItem('WA_start_id'))+1
   localStorage.setItem('WA_start_id',`${attempt_id}`)
   let attempt = new Attempt(team_list,nt,attempt_id,toi,tti)
   let req_index = create_or_update_match(attempt,mn,toi,tti,series_index)
   gp = document.getElementById('generate_panel')
   gp.style.display="none"
   display_teams(mn,req_index,toi,tti,series_index,attempt_id)
}

let create_or_update_match = function(attempt,mn,toi,tti,series_index)
{
   let flag = localStorage.getItem(`${sd.req_data[series_index].code}_${series_index}_${mn}`)
   if(flag==null)
   {
      match =new Match(mn,toi,tti)
      match.attempts.push(attempt)
      localStorage.setItem(`${sd.req_data[series_index].code}_${series_index}_${mn}`,JSON.stringify(match))
      return 0
   }
   else{
      match_obj = JSON.parse(flag)
      match_obj.attempts.push(attempt)
      localStorage.setItem(`${sd.req_data[series_index].code}_${series_index}_${mn}`,JSON.stringify(match_obj))
      return match_obj.attempts.length-1  
   }
}
let create_team = function(team,toi,tti,captain_id,vice_captain_id,team_number,credits)
{
   selected_team_one_index=[]
   selected_team_two_index=[]
   team.forEach((player)=>
   {
      if(player.player_team_index==toi)
         selected_team_one_index.push(player.player_index)
      else
         selected_team_two_index.push(player.player_index)
   })
   let req_team = new FinalTeam(toi,tti,selected_team_one_index,selected_team_two_index,captain_id,vice_captain_id,team_number,credits)
   return req_team
}
let get_team = function(wk,bat,al,bowl,fp_wk,fp_bat,fp_al,fp_bowl,strategy,f_wk,f_bat,f_al,f_bowl)
{
   selected_players = []
   fp_wk.forEach((player)=>selected_players.push(player))
   fp_bat.forEach((player)=>selected_players.push(player))
   fp_al.forEach((player)=>selected_players.push(player))
   fp_bowl.forEach((player)=>selected_players.push(player))
   //console.log(selected_players)
   //generating wicket keepers 
   let wk_limit = strategy[0]-f_wk
   let wk_cnt=0
   let wk_len=wk.length
   //console.log(wk)
   let wk_hash=[]
   for(let i=0;i<wk_len;i++) wk_hash.push(0)
   while(wk_cnt<wk_limit)
   {
      let rand_index = get_rand_value(wk.length)
      if(wk_hash[rand_index]==0)
      {
         selected_players.push(wk[rand_index])
         wk_hash[rand_index]=1;
         wk_cnt++
      }
   }
   //generating batsman keepers 
   let bat_limit = strategy[1]-f_bat

   let bat_cnt=0
   let bat_len=bat.length
  // console.log(bat_len)
   let bat_hash=[]
   for(let i=0;i<bat_len;i++) bat_hash.push(0)
   while(bat_cnt<bat_limit)
   {
      let rand_index = get_rand_value(bat.length)
      if(bat_hash[rand_index]==0)
      {
         selected_players.push(bat[rand_index])
         bat_hash[rand_index]=1;
         bat_cnt++
      }
   }
   //generating alrounder keepers 
   let al_limit = strategy[2]-f_al
   let al_cnt=0
   let al_len=al.length
   let al_hash=[]
   for(let i=0;i<al_len;i++) al_hash.push(0)
   while(al_cnt<al_limit)
   {
      let rand_index = get_rand_value(al.length)
      if(al_hash[rand_index]==0)
      {
         selected_players.push(al[rand_index])
         al_hash[rand_index]=1;
         al_cnt++
      }
   }
   //generating bowlers keepers 
   let bowl_limit = strategy[3]-f_bowl
   let bowl_cnt=0
   let bowl_len=bowl.length
   let bowl_hash=[]
   for(let i=0;i<bowl_len;i++) bowl_hash.push(0)
   while(bowl_cnt<bowl_limit)
   {
      let rand_index = get_rand_value(bowl.length)
      if(bowl_hash[rand_index]==0)
      {
         selected_players.push(bowl[rand_index])
         bowl_hash[rand_index]=1;
         bowl_cnt++
      }
   }
   return selected_players
}
