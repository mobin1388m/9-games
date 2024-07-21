export function drawStatusText(context , input ,player){
    context.font = ' 40px Helvetica'
    context.fillText('last key :' + input.lastkey,20 , 50)
    context.fillText('Active state : ' + player.currentstate.state, 20, 90)
}