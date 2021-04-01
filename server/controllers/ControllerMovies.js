const {Movie, ActorMovie, Actor, sequelize} = require('../models')
const {Op} = require('sequelize')

class ControllerMovies {
    static async read(req, res){
        console.log(req.query)
        const {sort, limit=5, page=1, search} = req.query

        let offset = (page-1)*5

        try{
            if(search){

                if(sort && sort !== 'undefined' && sort !== 'null'){
    
                    const movies = await Movie.findAndCountAll({
                        where: {
                            // title: sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), 'LIKE', '%' + search.toLowerCase() + '%')
                            title:{
                                [Op.iLike]: `%${search}%`
                                // [Op.substring]: search,
                            }
                            
                        },
                        include: Actor,
                        order: [
                            [req.query.sort, 'DESC']
                        ],
                        limit,
                        offset
                    })
                    res.status(200).json(movies)
                }else{
                    const movies = await Movie.findAndCountAll({
                        where: {
                            title: {
                                [Op.iLike]: `%${search}%`
                                // [Op.substring]: search,
                            }
                        },
                        include: Actor,
                        order: [
                            ['id', 'ASC']
                        ],
                        limit,
                        offset
                    })
                    res.status(200).json(movies)
                }

            }else{
                
                if(sort && sort !== 'undefined' && sort !== 'null'){
    
                    const movies = await Movie.findAndCountAll({
                        include: Actor,
                        order: [
                            [req.query.sort, 'DESC']
                        ],
                        limit,
                        offset
                    })
                    res.status(200).json(movies)
                }else{
                    const movies = await Movie.findAndCountAll({
                        include: {
                            model: Actor
                        },
                        order: [
                            ['id', 'ASC']
                        ],
                        limit,
                        offset
                    })
                    res.status(200).json(movies)
                }
            } 
            
        }catch(err){
            res.status(500).json(err)
        }

    }

}

module.exports={
    ControllerMovies
}