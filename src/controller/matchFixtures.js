import { dbCon } from "../server.js"

export const matchFixtures = {
    
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
}