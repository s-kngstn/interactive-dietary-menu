import nc from 'next-connect'
// import menu from '../../data/data'
import hardData from '../../data/hardData'




const handler = nc()
  .get((req, res) => {
    // res.json(menu)
    res.json(hardData)
  })

// YOU COULD MAKE A HANDLER FOR POST THAT ALLOWS THE RESTAURANT TO POST A NEW MENU AND DELETE THE OLD ONE  
export default handler