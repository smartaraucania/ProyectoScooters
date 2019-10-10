module.exports = {
    'port': process.env.PORT || 3000,
    'db':  process.env.MONGODB ||'mongodb://db/scooter',
    'secret':'TOkenSecretoCifradoPaSsWoRd', //pass secreta para generar token
    'precio':100 //precio por minuto de uso
}

/*            'mongodb://db/scooter',                    */
/*            'mongodb://mongo/scooter',                 */
/*         'mongodb://localhost:27017/scooter',          */ 