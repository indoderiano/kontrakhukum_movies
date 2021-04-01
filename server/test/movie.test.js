const {app} = require('./initial')
const {sequelize} = require('../models')
const request = require('supertest');


describe('Movie Data Testing', () => {

    it('No Search and No Sorted', (done) => {
        console.log('testing')
        request(app)
            .get("/movies?limit=5&page=1")
            .end((err, res) => {
                if(err){
                    done()
                }
                console.log(res.body)
                expect(res.status).toEqual(200)
                expect(typeof res.body.count).toBe('number')
                expect(res.body).toEqual(
                    expect.objectContaining({
                        count: expect.any(Number),
                        rows: expect.any(Array)
                    })
                )
                expect(res.body.rows).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            title: expect.any(String),
                            overview: expect.any(String),
                            poster_path: expect.any(String),
                            rate: expect.any(Number),
                            rate_count: expect.any(Number),
                            Actors: expect.any(Array)
                        })
                    ])
                )
                expect(res.body.rows.length).toEqual(5)
                done()
            })
    })

    
})




afterAll(async () => {

    await sequelize.close()
});