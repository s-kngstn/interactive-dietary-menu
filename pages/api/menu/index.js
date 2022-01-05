import nc from 'next-connect'
import menu from '../../../src/data/data'

const handler = nc()
  .get((req, res) => {
    res.json(menu)
  })

// YOU COULD MAKE A HANDLER FOR POST THAT ALLOWS THE RESTAURANT TO POST A NEW MENU AND DELETE THE OLD ONE  
export default handler