//Variable
const section_main = document.querySelector('.main');
const name = document.querySelector('.name');

const location = document.querySelector('#location');
const phone_num = document.querySelector('#phone_num');
const kind_of_food = document.querySelector('#kind_of');
const food_menu = document.querySelector('#food_menu');
const information = document.querySelector('#information');

const Yongsan = document.querySelector('#Yongsan');
const Gwangjin = document.querySelector('#Gwangjin');
const yongsan_url = 'https://api.odcloud.kr/api/15066516/v1/uddi:507e01f5-76ec-42ff-96a5-8b6ff9ce554e';
const yongsan_key = 'hY9%2BQxQPf%2FOL72XsdUPcl%2Fy53D48ugqZhkQaY%2Ft9%2Bu2%2BW1%2BcMRMXNUfRPMYoCBcdkzqt38gAlu9jUZx1hRvipw%3D%3D';
const Gwangjin_url = 'https://api.odcloud.kr/api/15052408/v1/uddi:611c5470-ad94-49e8-8f72-973732c56304';
const Gwangjin_key = 'hY9%2BQxQPf%2FOL72XsdUPcl%2Fy53D48ugqZhkQaY%2Ft9%2Bu2%2BW1%2BcMRMXNUfRPMYoCBcdkzqt38gAlu9jUZx1hRvipw%3D%3D';

let temp_latitude= 37.552965602230366, temp_longitude = 126.97252241992608;

// Main

// KAKAO MAP API
let mapContainer = document.querySelector('.map'), // 지도를 표시할 div
    mapOption = {
        center: new kakao.maps.LatLng(37.552965602230366, 126.97252241992608), // 지도의 중심좌표
        level: 7  // 지도의 확대 레벨
    };

let map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다


Yongsan.addEventListener('click', ()=> {
    Get_data(yongsan_url,1,314,yongsan_key);

});

Gwangjin.addEventListener('click', () => {
    Get_data(Gwangjin_url,1,48,Gwangjin_key);
})

//---------------------------------------------------------------------//
// Function Get_data(_url,_page, per_page,_key)
// _page: , per_page:
// Get data From 공공 데이터 포털 맛집 OPEN API
// + Marker 만들고 지도 중심 이동
//---------------------------------------------------------------------//
function Get_data(_url,_page, per_page,_key) {
    fetch(_url+'?page='+_page+'&perPage='+per_page+'&serviceKey='+_key)
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            console.log(JSON.stringify(myJson.totalCount));
            for(let i = 0; i < myJson.totalCount; i++)   {
                MakeMarker(myJson.data[i]);
            }
            let MoveTo = new kakao.maps.LatLng(temp_latitude,temp_longitude);
            map.setCenter(MoveTo);
        });
}


//--------------------------------------------------------------//
// Function MakeMarker(latitude,longitude)
// latitude: 위도, longitude: 경도
// Set Maker on Map
//--------------------------------------------------------------//
function MakeMarker(data) {
    temp_latitude = data.위도;
    temp_longitude = data.경도;
    let markerPosition = new kakao.maps.LatLng(data.위도,data.경도);
    let marker = new kakao.maps.Marker({
        position: markerPosition
    });


    marker.setMap(map);
    kakao.maps.event.addListener(marker, 'click', function() {
        name.innerHTML = data.업소명;
        location.innerText = data.주소;
        phone_num.innerText = data.전화번호;
        food_menu.innerText = data.주요요리;

        $.ajax({
            method: "GET",
            url: "https://dapi.kakao.com/v2/search/image",
            headers: { Authorization: "KakaoAK 27c5affbe05cca7945977d0430f8deeb" },
            data: { query: data.업소명 },
        })
            .done(function (img) {
                $("#_pic").attr("src", img.documents[0].thumbnail_url);
            });
    });
}

