import { dbCon } from "../server.js"

export const Contoller = {
    
    findOneTournament: async (req,res,next)=>{
        
        try {
            const {id} = req.params

            const query = (`
                select * from tournaments
                where tournament_id = $1`)

            const result = await dbCon.query(query,[id])

            if(result.rowCount === 0){
                return res.status(404).send(`${id} not found`)
            }

            res.json(result.rows[0])
        } catch (error) {
            next(error)
        }
    },

    findOneTournamentGroup: async (req,res,next)=>{
        
        try {
            const {id} = req.params

            const query = (`
                select * from tournament_groups
                where group_id = $1`)

            const result = await dbCon.query(query,[id])

            if(result.rowCount === 0){
                return res.status(404).send(`${id} not found`)
            }

            res.json(result.rows[0])
        } catch (error) {
            next(error)
        }
    },

    findOneFootballClubs: async (req,res,next)=>{
        
        try {
            
            const {id} = req.params
            if(!id) return res.status(404).send(`${id} not found`)
            
            const query = (`
                select * from football_clubs
                where club_id = $1`)

            const result = await dbCon.query(query,[id])
            if(result.rowCount === 0 ) return res.status(404).send(`Data not found by id`)

            res.json(result.rows)

        } catch (error) {
            next(error)
        }
    },

    findOnePlayer: async (req,res,next)=>{
        
        try {
            const {id} = req.params

            const query = (`
                select * from players
                where player_id = $1`)

            const result = await dbCon.query(query,[id])

            if(result.rowCount === 0){
                return res.status(404).send(`${id} not found`)
            }

            res.json(result.rows[0])
        } catch (error) {
            next(error)
        }
    },

    findOneMatchFixture: async (req,res,next)=>{
        
        try {
            const {id} = req.params

            const query = (`
                select * from match_fixtures
                where match_id = $1`)

            const result = await dbCon.query(query,[id])

            if(result.rowCount === 0){
                return res.status(404).send(`${id} not found`)
            }

            res.json(result.rows[0])
        } catch (error) {
            next(error)
        }
    },

    findOneTeam: async (req,res,next)=>{
        
        try {
            const {id} = req.params

            const query = (`
                select * from teams
                where team_id = $1`)

            const result = await dbCon.query(query,[id])

            if(result.rowCount === 0){
                return res.status(404).send(`${id} not found`)
            }

            res.json(result.rows[0])
        } catch (error) {
            next(error)
        }
    },


    findAllTournament: async (req,res,next)=>{
        
        try {
            
            const query = (`select * from tournaments order by tournament_id`)
            
            const result = await dbCon.query(query)
            if(result.rowCount === 0){
                return res.status(404).send(`Insufficient data to find all`)
            }

            res.json(result.rows)


        } catch (error) {
            next(error)
        }
    },

    findAllTournamentGroup: async (req,res,next)=>{
        
        try {
            
            const query = (`select * from tournament_groups
                 order by group_id`)
            
            const result = await dbCon.query(query)
            if(result.rowCount === 0){
                return res.status(404).send(`Insufficient data to find all`)
            }

            res.json(result.rows)


        } catch (error) {
            next(error)
        }
    },

    findAllFootballClubs:async(req,res,next)=>{
        
        try {
            const query = (`
                select * from football_clubs`)
    
            const result = await dbCon.query(query)
            if(result.rowCount === 0) return res.status(404).send(`Insufficient length to get all`)
    
            res.json(result.rows)
        } catch (error) {
            next(error)
        }
    },

    findAllPlayers: async (req,res,next)=>{
        
        try {
            
            const query = (`select * from players order by player_id`)
            
            const result = await dbCon.query(query)
            if(result.rowCount === 0){
                return res.status(404).send(`Insufficient data to find all`)
            }

            res.json(result.rows)


        } catch (error) {
            next(error)
        }
    },
    

    findAllMatchFixtures: async (req,res,next)=>{
        
        try {
            
            const query = (`select * from match_fixtures order by match_id`)
            
            const result = await dbCon.query(query)
            if(result.rowCount === 0){
                return res.status(404).send(`Insufficient data to find all`)
            }

            res.json(result.rows)


        } catch (error) {
            next(error)
        }
    },

    findAllTeams: async (req,res,next)=>{
        
        try {
            
            const query = (`select * from teams order by team_id`)
            
            const result = await dbCon.query(query)
            if(result.rowCount === 0){
                return res.status(404).send(`Insufficient data to find all`)
            }

            res.json(result.rows)


        } catch (error) {
            next(error)
        }
    },

    createTournament: async (req,res,next)=>{
         
        try {
            
            const {tournamentName,startDate,endDate,status} = req.body
             

            if(!tournamentName || !startDate || !endDate || !status){
                return res.status(400).send(`All data is required to post`)
            }

            const query = `
                insert into tournaments (tournament_name,start_date,end_date,status)
                values ($1,$2,$3,$4)
                returning *`;

            const result = await dbCon.query(query,
                   [tournamentName,
                    startDate,
                    endDate,
                    status])
            
            res.status(201).json(result.rows)
            
        } catch (error) {
            next(error)
        }
    },

    createTournamentGroup: async (req,res,next)=>{
         
        try {
            
            const {groupName,tournamentId} = req.body
             

            if(!groupName || !tournamentId){
                return res.status(400).send(`All data is required to post`)
            }

            const query = `
                insert into tournament_groups (group_name,tournament_id)
                values ($1,$2)
                returning *`;

            const result = await dbCon.query(query,
                   [groupName,
                    tournamentId])
            
            res.status(201).json(result.rows)
            
        } catch (error) {
            next(error)
        }
    },

    createFootballClubs:async(req,res,next)=>{
        
        try {
            
            const {clubName,city,country,foundedYear} = req.body
            
            if(!clubName || !city || !country || !foundedYear) return res.status(400).send(`All data required to post`)

            const query = (`
                insert into football_clubs (club_name,city,country,founded_year)
                values ($1,$2,$3,$4) returning *`)

            const result = await dbCon.query(query,[clubName,city,country,foundedYear])
            res.status(201).json(result.rows)
       
        } catch (error) {
            next(error)
        }
    },
    
    createPlayers: async (req,res,next)=>{
         
        try {
            
            const {fullName,dateOfBirth,position,teamId,jerseyNumber} = req.body
             

            if(!fullName || !dateOfBirth || !position || !teamId || !jerseyNumber){
                return res.status(400).send(`All data is required to post`)
            }

            const query = `
                insert into players (full_name,date_of_birth,position,team_id,jersey_number)
                values ($1,$2,$3,$4,$5)
                returning *`;

            const result = await dbCon.query(query,
                   [fullName,
                    dateOfBirth,
                    position,
                    teamId,
                    jerseyNumber])
            
            res.status(201).json(result.rows)
            
        } catch (error) {
            next(error)
        }
    },

    createMatchFixtures: async (req,res,next)=>{
         
        try {
            
            const {matchDate,venue,homeTeamId,awayTeamId,homeScore,awayScore,tournamentId,matchStatus} = req.body
             

            if(!matchDate || !venue || !homeTeamId || !awayTeamId || !homeScore || !awayScore || ! tournamentId || !matchStatus){
                return res.status(400).send(`All data is required to post`)
            }

            const query = `
                insert into match_fixtures
                (match_date,venue,home_team_id,away_team_id,
                home_score,away_score,tournament_id,match_status)
                values ($1,$2,$3,$4,$5,$6,$7,$8)
                returning *`;

            const result = await dbCon.query(query,
                   [matchDate,
                    venue,
                    homeTeamId,
                    awayTeamId,
                    homeScore,
                    awayScore,
                    tournamentId,
                    matchStatus])
            
            res.status(201).json(result.rows)
            
        } catch (error) {
            next(error)
        }
    },
    
    createTeams:async(req,res,next)=>{
        
        try {
            
            const {teamName,clubId,groupId,coachName} = req.body
            
            if(!teamName || !clubId || !groupId || !coachName) return res.status(400).send(`All data required to post`)

            const query = (`
                insert into teams (team_name,club_id,group_id,coach_name)
                values ($1,$2,$3,$4) returning *`)

            const result = await dbCon.query(query,[teamName,clubId,groupId,coachName])
            res.status(201).json(result.rows)
       
        } catch (error) {
            next(error)
        }
    },
    
    updateTournament: async (req,res,next)=>{
        
        try {
            const {id} = req.params
    
            if(!id) return res.status(404).send(`${id} not found`)
    
            const body = req.body
    
            if(!body.tournamentName && !body.startDate && !body.endDate && !body.status){
                return res.status(400).send(`At least one data is required to update`)
            }
    
            const fields = Object.keys(body)
            .map((key,i)=> `${key.replace(/([A-Z])/g, "_$1").toLowerCase()} = $${i + 1}`)
            .join(", ")
            const values = [...Object.values(body),id]
    
            const query = (`
                update tournaments 
                set ${fields} 
                where tournament_id = $${values.length}`)
    
            const result = await dbCon.query(query,values)
    
            if(result.rowCount === 0) return res.status(404).send(`Data not found in updating`)
            
            res.json(`Data has been updated`)
        } catch (error) {
            next(error)
        }
    },

    updateTournamentGroup: async (req,res,next)=>{
        
        try {
            const {id} = req.params
    
            if(!id) return res.status(404).send(`${id} not found`)
    
            const body = req.body
    
            if(!body.groupName && !body.tournamentId){
                return res.status(400).send(`At least one data is required to update`)
            }
    
            const fields = Object.keys(body)
            .map((key,i)=> `${key.replace(/([A-Z])/g, "_$1").toLowerCase()} = $${i + 1}`)
            .join(", ")
            const values = [...Object.values(body),id]
    
            const query = (`
                update tournament_groups
                set ${fields} 
                where tournament_id = $${values.length}`)
    
            const result = await dbCon.query(query,values)
    
            if(result.rowCount === 0) return res.status(404).send(`Data not found in updating`)
            
            res.json(`Data has been updated`)
        } catch (error) {
            next(error)
        }
    },

    updateFootballClubs:async(req,res,next)=>{
        
        const {id} = req.params
        const body = req.body
        
        if(!id || (!body.clubName && !body.city && !body.country && !body.foundedYear)){
            return res.status(400).send(`ID not found or at least one data is required to put data`)
        }

        const fields = Object.keys(body)
            .map((key,i)=> `${key.replace(/([A-Z])/g, "_$1").toLowerCase()} = $${i + 1}`)
            .join(", ")
            const values = [...Object.values(body),id]

        const query = (`
            update football_clubs
            set ${fields}
            where club_id = $${values.length}`)

        const result = await dbCon.query(query,values)

        if(result.rowCount === 0) return res.status(400).send(`Data not found in updating`)

        res.json(`Data has been successfully updated`)

    },
    
    updatePlayers: async (req,res,next)=>{
        
        try {
            const {id} = req.params
    
            if(!id) return res.status(404).send(`${id} not found`)
    
            const body = req.body
    
            if(!body.fullName && !body.dateOfBirth && !body.position && !body.teamId && !body.jerseyNumber){
                return res.status(400).send(`At least one data is required to update`)
            }
    
            const fields = Object.keys(body)
            .map((key,i)=> `${key.replace(/([A-Z])/g, "_$1").toLowerCase()} = $${i + 1}`)
            .join(", ")
            const values = [...Object.values(body),id]
    
            const query = (`
                update players 
                set ${fields} 
                where player_id = $${values.length}`)
    
            const result = await dbCon.query(query,values)
    
            if(result.rowCount === 0) return res.status(404).send(`Data not found in updating`)
            
            res.json(`Data has been updated`)
        } catch (error) {
            next(error)
        }
    },

    updateMatchFixtures: async (req,res,next)=>{
        
        try {
            const {id} = req.params
    
            if(!id) return res.status(404).send(`${id} not found`)
    
            const body = req.body
    
            if(!body.matchDate && !body.venue && !body.homeTeamId && !body.awayTeamId && !body.homeScore && !body.awayScore && ! body.tournamentId && !body.matchStatus){
                return res.status(400).send(`At least one data is required to update`)
            }
    
            const fields = Object.keys(body)
            .map((key,i)=> `${key.replace(/([A-Z])/g, "_$1").toLowerCase()} = $${i + 1}`)
            .join(", ")
            const values = [...Object.values(body),id]
    
            const query = (`
                update match_fixtures 
                set ${fields} 
                where match_id = $${values.length}`)
    
            const result = await dbCon.query(query,values)
    
            if(result.rowCount === 0) return res.status(404).send(`Data not found in updating`)
            
            res.json(`Data has been updated`)
        } catch (error) {
            next(error)
        }
    },

    updateTeams: async (req,res,next)=>{
        
        try {
            const {id} = req.params
    
            if(!id) return res.status(404).send(`${id} not found`)
    
            const body = req.body
    
            if(!body.teamName && !body.clubId && !body.groupId && !body.coachName){
                return res.status(400).send(`At least one data is required to update`)
            }
    
            const fields = Object.keys(body)
            .map((key,i)=> `${key.replace(/([A-Z])/g, "_$1").toLowerCase()} = $${i + 1}`)
            .join(", ")
            const values = [...Object.values(body),id]
    
            const query = (`
                update teams
                set ${fields} 
                where team_id = $${values.length}`)
    
            const result = await dbCon.query(query,values)
    
            if(result.rowCount === 0) return res.status(404).send(`Data not found in updating`)
            
            res.json(`Data has been updated`)
        } catch (error) {
            next(error)
        }
    },

    deleteTournament: async (req,res,next)=>{
         
        try {
            const {id} = req.params
            if(!id) return res.status(404).send(`${id} not found`)

            const query = (`
                delete from tournaments where tournament_id = $1`)
            
            const result = await dbCon.query(query,[id])
            if(result.rowCount === 0) return res.status(400).send(`Data not found in deleting`)
            
            res.json(`Data has been deleted`)
        } catch (error) {
            next(error)
        }
    },

    deleteTournamentGroup: async (req,res,next)=>{
         
        try {
            const {id} = req.params
            if(!id) return res.status(404).send(`${id} not found`)

            const query = (`
                delete from tournament_groups where group_id = $1`)
            
            const result = await dbCon.query(query,[id])
            if(result.rowCount === 0) return res.status(400).send(`Data not found in deleting`)
            
            res.json(`Data has been deleted`)
        } catch (error) {
            next(error)
        }
    },

    deleteFootballClubs:async(req,res,next)=>{
        
        const {id} = req.params

        if(!id) return res.status(404).send(`${id} not found`)
        
        const query = (`
            delete from football_clubs where club_id = $1`)

        const result = await dbCon.query(query,[id])

        if(result.rowCount === 0) return res.status(404).send(`Data not found in deleting`)

        res.json(`Data has been successfully deleted`)
    },

    deletePlayers: async (req,res,next)=>{
         
        try {
            const {id} = req.params
            if(!id) return res.status(404).send(`${id} not found`)

            const query = (`
                delete from players where player_id = $1`)
            
            const result = await dbCon.query(query,[id])
            if(result.rowCount === 0) return res.status(400).send(`Data not found in deleting`)
            
            res.json(`Data has been deleted`)
        } catch (error) {
            next(error)
        }
    },

    deleteMatchFixtures: async (req,res,next)=>{
         
        try {
            const {id} = req.params
            if(!id) return res.status(404).send(`${id} not found`)

            const query = (`
                delete from match_fixtures where match_id = $1`)
            
            const result = await dbCon.query(query,[id])
            if(result.rowCount === 0) return res.status(400).send(`Data not found in deleting`)
            
            res.json(`Data has been deleted`)
        } catch (error) {
            next(error)
        }
    },

    deleteTeams: async (req,res,next)=>{
         
        try {
            const {id} = req.params
            if(!id) return res.status(404).send(`${id} not found`)

            const query = (`
                delete from teams where team_id = $1`)
            
            const result = await dbCon.query(query,[id])
            if(result.rowCount === 0) return res.status(400).send(`Data not found in deleting`)
            
            res.json(`Data has been deleted`)
        } catch (error) {
            next(error)
        }
    }
}