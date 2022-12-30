function calc() {
  // 羽田⇔発着地の区間マイル
  const hanedaList = {
    'osaka':  280,
    'sapporo':  510,
    'nagoya':  193,
    'fukuoka':  567,
    'naha':  984,
    'memambetsu':  609,
    'asahikawa':  576,
    'kushiro':  555,
    'obihiro':  526,
    'hakodate':  424,
    'aomori':  358,
    'misawa':  355,
    'akita':  279,
    'hanamaki':  284,
    'sendai':  177,
    'yamagata':  190,
    'komatsu':  211,
    'nankishirahama':  303,
    'okayama':  356,
    'izumo':  405,
    'hiroshima':  414,
    'yamaguchiube':  510,
    'tokushima':  329,
    'takamatsu':  354,
    'kochi':  393,
    'matsuyama':  438,
    'kitakyushu':  534,
    'oita':  499,
    'nagasaki':  610,
    'kumamoto':  568,
    'miyazaki':  561,
    'kagoshima':  601,
    'amami':  787,
    'kumejima':  1018,
    'miyako':  1158,
    'ishigaki': 1224,
  }

  // 利用した区間の区間マイルを格納する配列
  let mileArray = []

  // 選択された値を取得
  const numOptionRow = 20
  for(let i = 0; i<numOptionRow; i++) {
    // 取得するDOMのキーを動的に組み立て
    let departKey = "use" + (parseInt(i)+1) + "-depart"
    let arrivalKey = "use" + (parseInt(i)+1) + "-arrival"
    let classKey ="use" + (parseInt(i)+1) + "-class"
    let rateKey = "use" + (parseInt(i)+1) + "-rate"

    // 到着地・積算率を取得（出発地は羽田固定）
    let arrivalSelection = document.getElementById(arrivalKey)
    let classSelection = document.getElementById(classKey)
    let rateSelection = document.getElementById(rateKey)

    let arrivalSelected = arrivalSelection.options[arrivalSelection.selectedIndex].value
    let classSelected = classSelection.options[classSelection.selectedIndex].value
    let rateSelected = rateSelection.options[rateSelection.selectedIndex].value
    if(arrivalSelected != 'none' && rateSelected != 'none' && classSelected != 'none') {
      mileArray.push(parseInt(hanedaList[arrivalSelected])*(parseFloat(rateSelected)+parseFloat(classSelected)))
    }
  }
  console.log(mileArray)

  // 普通カード・CLUBA-Aカードそれぞれの積算マイルを計算
  let normalCardMile = 0
  let clubACardMile = 0
  const normalRatio = 1.1
  const clubARatio = 1.25
  mileArray.forEach(mile => {
    normalCardMile = normalCardMile + mile*normalRatio
    clubACardMile = clubACardMile + mile*clubARatio
  })
  console.log(normalCardMile)

  document.getElementById("result-normal").innerHTML = "普通カードの場合の積算マイルは" + normalCardMile +"マイル"
  document.getElementById("result-cluba").innerHTML = "CLUB-Aカードの場合の積算マイルは" + clubACardMile +"マイル"
  document.getElementById("diff").innerHTML = "CLUB-Aカードのほうが" + (clubACardMile - normalCardMile) + "マイル多く獲得できる"
}