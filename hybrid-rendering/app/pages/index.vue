<template>
  <div>
    hello?

    <h4>
      확인해야할거 
      렌더링 내가 생각한대로 동작하는지
      ?
    </h4>
    <h5>
      안함 ssr옵션이 뭐든지간에 router-view를 사용하면 
      인스턴스 재사용이 가능하지만 nuxt에서는 비추라서 애매함 
      ssr옵션에 따른 차이를 확인 현재는 
      amchart같은거 다운 받아서 확인해봐야 할듯 
      ;;; amchart똑같이 로딩되면 할필요가 없는거 아니야?
    </h5>
    <p>
      Docs 되는지 확인 완 app 외부에 있어야함.... 허....
    </p>
    <p>
      도커로 한번 배포 해보기 빠르게 한번 보고 
      서버쪽 해서 한번 보기 다른 프젝으로 해봄 
    </p>
    <p>
      배포 후 3g 로딩 확인 해야함 dev에서는 엄청느림 ㅋㅋㅋ 근데
      예시는 엄청 빠른데;;; 비교도 안되게 빠름 심지어 영상데이터 있는곳인데 
      배포시 엄청빠름 ㅇㅇ
    </p>
    <p>
      국제화 스크립팅 해봐야함, 완 똑같은거 사용함 설정만 좀 다름 
    </p>
    <p>
      서버or, route미들웨어 토큰거부 
    </p>
    <p>
      권한을 해결했어 그러면 이제 추가로 roles에 관한 미들웨어도 있어야 하는데 이건 따로 먹여서 개이득임 
    </p>
  </div>
</template>

<script setup lang="ts">
import { useCookie } from '#app';

// nuxt.config에 선언된것과 같다. 
// definePageMeta({
//   middleware:[
//     'each-page'
//   ]
// })

// definePageMeta({
//   async validate(r){
//     // 미들보다 빠름 
//     console.log('index/ validate')
//     await $fetch('/api/auth/verification', {
//       method:'POST',})
//     return true
//   }
// })
// const route = useRoute()
// console.log(route, 'page/index route')

// console.log(test.value)
</script>