import nc from 'next-connect'
import hardData from '../../data/hardData'




const handler = nc()
  .get((req, res) => {
    // res.json(menu)
    console.log(hardData)
    res.json(hardData)
  })

// YOU COULD MAKE A HANDLER FOR POST THAT ALLOWS THE RESTAURANT TO POST A NEW MENU AND DELETE THE OLD ONE  
export default handler