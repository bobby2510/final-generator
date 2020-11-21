class Player
  {
    constructor(n,r,c,i,p_i,p_t_i,player_id)
    {
      this.player_name = n
      this.player_role = r
      this.player_credits = c
      this.player_image = i
      this.player_index=p_i
      this.player_team_index=p_t_i
      this.player_id=player_id
    }
  }
class Team
  {
    constructor(player_list,team_n)
    {
      this.players =player_list
      this.team_name = team_n
    }
  }
class Series
{
  constructor(series_code,series_name,teams_list,teams)
  {
    this.code= series_code
    this.name = series_name
    this.teams_list = teams_list
    this.teams = teams
  }
}
let store_teams = function(){
  if(localStorage.getItem('WA_teams_stored')=='stored') return
  //var req_data=null
  url = "https://cors-anywhere.herokuapp.com/https://cricket-api-free.herokuapp.com/"
  fetch(url)
    .then((res)=>
    {
      return res.json()
    })
    .then((json_data)=>
    {
      let req_data=json_data.req_data
        Series_Final_List=[]
        for(let j=0;j<req_data.length;j++)
        {
          Team_Final_List=[]
          data = req_data[j]
          for(let i=0;i<data.number_teams;i++)
          {
              let obj =data.teams[i]
              let player_list_obj=[]
              for(let k=0;k<obj.players_name.length;k++)
              {
                  player_list_obj.push(new Player(obj.players_name[k],obj.players_role[k],obj.players_credits[k],obj.players_image[k],k,i,obj.players_id[k]))
              }
              Team_Final_List.push(new Team(player_list_obj,obj.team_name))
          }
          Series_Final_List.push(new Series(data.series_code,data.series_name,data.team_list,Team_Final_List))
        }
        //console.log(Team_Final_List)
        json_string = JSON.stringify({req_data:Series_Final_List,})
        localStorage.setItem('series_data',json_string)
        localStorage.setItem('WA_teams_stored','stored')
        localStorage.setItem('WA_start_id','101')
    })
    .catch((error)=>
    {
      console.log('Error while fetching data!')
    })  
}