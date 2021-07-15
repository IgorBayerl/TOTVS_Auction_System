const router = require('express').Router();
const verify = require('./tokenVerifier');
const connection = require('../database/connection');
const { createAuctionValidation, updateAuctionValidation, deleteAuctionValidation, bidValidation, dataValuesValidation } = require('../validation');


router.get('/room/:auctionId', verify, async(req, res) => {
    try {
        const { auctionId } = req.params;
        const user_id = req.user._id

        // Verify if auction exists
        const verifyAuction = await connection('auctions').select('*').where('id', '=', auctionId).first();
        if (!verifyAuction) {
            return res.status(400).send(`Cand find the id of the auction you are looking for - ${auctionId}`);
        }

        const auction = await connection('auctions as a')
            .column('usr.name as owner_user_name', 'u.name as winner_user_name', 'owner_user_id')
            .column('a.id', 'a.title', 'a.description' ,'a.is_new', 'a.initial_value','a.winner_value')
            .column('a.owner_user_id','a.winner_user_id','a.initial_date','a.final_date')
            .select()
            .join('users as usr', 'a.owner_user_id', 'usr.id')
            .join('users as u', 'a.winner_user_id', 'u.id')
            .where("a.id", auctionId)
            .first()

        if (!auction) return res.status(400).send('Invalid ID');

        res.send(auction)

    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }
    
});

router.post('/create_auction', verify, async (req, res) => {

    try {
        const { title, description, is_new, initial_value, initial_date, final_date } = req.body;
        const user_id = req.user._id

        // validate informations with Joi
        const {error} = createAuctionValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        await connection('auctions').insert({
            title: title,
            description: description,
            is_new: is_new,
            winner_value: initial_value,
            initial_value: initial_value,
            owner_user_id: user_id,
            winner_user_id: user_id,
            initial_date: initial_date,
            final_date: final_date,
        }).catch(function(error) {
            if (error) return res.status(400).send('Erro ao gravar no banco');
        });
        res.send('Success');
       
    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }
});
router.get('/list', verify, async (req, res) => {
    const user_id = req.user._id
    try {

        const { page = 1 } = req.query
        const auctions = await connection('auctions as a')
        .column('usr.name as owner_user_name', 'u.name as winner_user_name', 'owner_user_id')
        .column('a.id', 'a.title', 'a.description' ,'a.is_new', 'a.initial_value','a.winner_value')
        .column('a.owner_user_id','a.winner_user_id','a.initial_date','a.final_date')
        .select()
        .join('users as usr', 'a.owner_user_id', 'usr.id')
        .join('users as u', 'a.winner_user_id', 'u.id')
        .offset((page - 1) *5)
        .where('a.owner_user_id', user_id);

        const count = auctions.length 
        
        res.header('X-Total-Count', count);
        res.send(auctions);
    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }
    
});

router.get('/list_all', verify, async (req, res) => {
    try {
        const { page = 1 } = req.query
        const auctions = await connection('auctions as a')
        .column('usr.name as owner_user_name', 'u.name as winner_user_name', 'owner_user_id')
        .column('a.id', 'a.title', 'a.description' ,'a.is_new', 'a.initial_value','a.winner_value')
        .column('a.owner_user_id','a.winner_user_id','a.initial_date','a.final_date')
        .select()
        .join('users as usr', 'a.owner_user_id', 'usr.id')
        .join('users as u', 'a.winner_user_id', 'u.id')
        .offset((page - 1) *5);

        const count = auctions.length 
        
        res.header('X-Total-Count', count);
        res.send(auctions);
    } catch (error) {
        res.status(400).send(error);
    }
    
});

router.post('/update_auction', verify, async (req, res) => {

    try {
        const {id, title, description, is_new, initial_value, initial_date, final_date } = req.body;
        const user_id = req.user._id

        // validate informations with Joi
        const {error} = updateAuctionValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        
        // Verify if auction exists
        const auction = await connection('auctions').select('*').where("id", id).andWhere('owner_user_id', user_id).first();
        if (!auction) return res.status(400).send('Invalid ID');

        await connection('auctions').where('id', id).andWhere('owner_user_id', user_id).update({
            title: title,
            description: description,
            is_new: is_new,
            winner_value: initial_value,
            initial_value: initial_value,
            owner_user_id: user_id,
            initial_date: initial_date,
            final_date: final_date,
        }).catch(function(error) {
            if (error) return res.status(400).send('Erro ao gravar no banco');
        });
        res.send('Success');
       
    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }
});

router.post('/delete_auction', verify, async (req, res) => {

    try {
        const {id} = req.body;
        const user_id = req.user._id

        // validate informations with Joi
        const {error} = deleteAuctionValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        
        // Verify if auction exists
        const auction = await connection('auctions').select('*').where("id", id).andWhere('owner_user_id', user_id).first();
        if (!auction) return res.status(400).send('Invalid ID');

        await connection('auctions').where('id', id).andWhere('owner_user_id', user_id).delete().catch(function(error) {
            if (error) return res.status(400).send('Erro ao gravar no banco');
        });
        res.send('Success');
       
    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }
});



router.post('/bid', verify, async (req, res) => {

    try {
        const { auction_id, value } = req.body;
        const user_id = req.user._id

        // validate informations with Joi
        const {error} = bidValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        
        // Verify if auction exists
        const auction = await connection('auctions').select('*').where("id", auction_id).first();
        if (!auction) return res.status(400).send('Invalid ID');

        const nowTime = new Date();
        const nowIsoTime = nowTime.toISOString();

        const dataValidation = {
            'current_time': nowIsoTime,
            'start_time': auction.initial_date,
            'limit_time': auction.final_date,
            'initial_value': parseFloat(auction.initial_value),
            'winner_value': parseFloat(auction.winner_value),
            'bid_value': parseFloat(value),
        }
        
        const dataValidationResult = dataValuesValidation(dataValidation);
        if(dataValidationResult.error) return res.status(400).send(dataValidationResult.error.details[0].message);
        
        await connection('auctions').where('id', auction_id).update({
            winner_value: value,
            winner_user_id: user_id,
        }).catch(function(error) {
            if (error) return res.status(400).send('Erro ao gravar no banco');
        });

        const auctionNew = await connection('auctions as a')
        .column('usr.name as owner_user_name', 'u.name as winner_user_name', 'owner_user_id')
        .column('a.id', 'a.title', 'a.description' ,'a.is_new', 'a.initial_value','a.winner_value')
        .column('a.owner_user_id','a.winner_user_id','a.initial_date','a.final_date')
        .select()
        .join('users as usr', 'a.owner_user_id', 'usr.id')
        .join('users as u', 'a.winner_user_id', 'u.id')
        .where("a.id", auction_id)
        .first();
        if (!auctionNew) return res.status(400).send('Invalid ID');

        res.send(auctionNew);
       
    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }
});


module.exports = router;