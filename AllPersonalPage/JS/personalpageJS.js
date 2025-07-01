    // card 라는 이름의 객체가 있는데, 이 객체는 문서의 #card입니다.
    const card = document.getElementById('card');

    // 마우스가 움직이는 걸 감지함. e = event. 이 이벤트가 일어나면 {...}의 구문이 실행됨.
    card.addEventListener('mousemove', (e) => {
        //객체가 어디에, 어떤 크기로 존재하는지 알아내야 함.
        //하단의 구문은 마우스가 어디에 있는가에 따라 회전하는 각도가 다르기 때문에, 마우스의 위치를 알아내기 위해 사용한 함수임.
        //해당 함수는 객체의 크기(내부, padding, border)와 위치를 사각형의 형태로 반환함.
        const rect = card.getBoundingClientRect();

        //마우스 위치 기준으로 중심에서의 거리 계산.
        //이 구문은 마우스가 카드 위에서 움직일 때만 실행됩니다.
        //e.clientX, e.clientY 는 모두 지금 마우스가 >>브라우저 전체<<에서 어디에 있는지 반환합니다.
        //따라서, #card가 위, 왼쪽에서 얼마나 떨어졌는지를 알아내어 빼 주면 마우스가 #card의 어디에 위치하고 있는지 알 수 있습니다.
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // 반환된 사각형의 가로세로를 반으로 나누어 사각형의 중앙을 찾습니다.
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // retateX, rotateY의 값만큼 회전시킬 겁니다.
        // y - centerY -> 중앙에서 얼마나 벗어나 있는지 확인합니다.
        // "/50" 회전하는 값을 줄여 덜 움직이게끔 합니다.
        const rotateX = -(y - centerY) / 50;
        const rotateY = (x - centerX) / 50;
        
        //그림자가 움직이는 효과를 넣음. Y는 움직이지 않는 코드.
        const shadowX = (x - centerX) / 50;

        // 회전은 이 구문에서 실행됩니다.
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        card.style.boxShadow = `${-shadowX}px 0px 15px rgba(0, 0, 0, 0.4)`;
    });

    card.addEventListener('mouseleave', () => {
        // 마우스가 벗어나면 원위치
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        card.style.boxShadow = `0 0px 15px rgba(0, 0, 0, 0.4)`; // 원래 상태로 복원
    });