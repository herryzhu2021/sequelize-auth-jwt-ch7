var totalGame = 0
var resultArr = []

function checkResult(obj) {
  const hasil = document.querySelector('#hasil')
  if (hasil.className != 'state-awal') {
    return
  }

  const choice = ['batu', 'kertas', 'gunting']

  // console.log(obj);
  const dataVal = obj.getAttribute('data-val')
  console.log('Player1: ' + dataVal)

  obj.className = 'img-suit-selected'

  //Computer
  const rand = Math.floor(Math.random() * 3)
  const compVal = choice[rand]
  console.log('COM: ' + compVal)

  const compImg = document.querySelector('#comp-' + compVal)
  compImg.className = 'img-suit-selected'

  let result = ''

  if (dataVal == compVal) {
    result = 'draw'
  } else {
    if (
      (dataVal == 'batu' && compVal == 'kertas') ||
      (dataVal == 'kertas' && compVal == 'gunting') ||
      (dataVal == 'gunting' && compVal == 'batu')
    ) {
      result = 'lost'
    } else {
      result = 'win'
    }
  }
  
  console.log(result)
  
  showResult(result)

  totalGame++;
  console.log("total game = "+totalGame);
  resultArr.push(result)
  if (totalGame == 3) {
    $.post( "/api/v1/auth/passGameArr", { 'resulta': resultArr }, function( data ) {
      backToMain()
    } )
  .always(function( data ) {
    backToMain()
  });
  }
}

function showResult(result) {
  const hasil = document.querySelector('#hasil')
  if (result == 'draw') {
    hasil.innerHTML = 'DRAW'
    hasil.className = 'result'
  } else if (result == 'win') {
    hasil.innerHTML = 'PLAYER 1 <br> WIN'
    hasil.className = 'result'
  } else {
    hasil.innerHTML = 'COM <br> WIN'
    hasil.className = 'result'
  }
}

function resetResult() {
  const hasil = document.querySelector('#hasil')
  hasil.className = 'state-awal'
  hasil.innerHTML = 'VS'
  let imageList = document.querySelectorAll('.img-suit-selected')

  for (const val of imageList) {
    val.className = 'img-suit'
  }
}

function backToMain() {
  window.location.href = '/dashboard'
}
