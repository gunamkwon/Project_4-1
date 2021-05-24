// OPEN API - FOOD
fetch('https://api.odcloud.kr/api/15066516/v1/uddi:507e01f5-76ec-42ff-96a5-8b6ff9ce554e?page=1&perPage=314&serviceKey=hY9%2BQxQPf%2FOL72XsdUPcl%2Fy53D48ugqZhkQaY%2Ft9%2Bu2%2BW1%2BcMRMXNUfRPMYoCBcdkzqt38gAlu9jUZx1hRvipw%3D%3D')
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        console.log(JSON.stringify(myJson.totalCount));
        for(let i = 0; i < myJson.totalCount; i++)   {
            MakeMarker(myJson.data[i].위도,myJson.data[i].경도);
        }
    });

// KAKAO MAP API
let mapContainer = document.querySelector('.map'), // 지도를 표시할 div
    mapOption = {
        center: new kakao.maps.LatLng(37.552965602230366, 126.97252241992608), // 지도의 중심좌표
        level: 7  // 지도의 확대 레벨
    };

let map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다



/////////////////////////////////////////////////////////////////
// Function MakeMarker(latitude,longitude)
// latitude: 위도, longitude: 경도
// Set Maker on Map
/////////////////////////////////////////////////////////////////
function MakeMarker(latitude,longitude) {
    let makerPosition = new kakao.maps.LatLng(latitude,longitude);

    let maker = new kakao.maps.Marker({
        position: makerPosition
    });

    maker.setMap(map);
}
