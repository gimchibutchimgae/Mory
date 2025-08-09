# Mory: 감정 기반 다이어리 서비스
## 프로젝트 개요

**Mory**는 일상 속 감정과 기억을 글로 기록하여, 인공지능이 그날의 일기가 어떤 감정이었는지 분석하며 , 이를 자신만의 캐릭터로 시각화하고 성장시키는 감정 기반 다이어리 서비스입니다. 사용자는 간단한 일기를 작성함으로써, 감정의 흐름을 추적하고 자신을 이해하는 데 도움을 받게 됩니다.

이 프로젝트의 기획 의도는, 바쁜 일상 속에서 감정에 무뎌지기 쉬운 현대인들에게 **감정 인식의 기회를 제공하고**, 이를 통해 **정서적 자기 인식(Self-awareness)을 향상**시키는 데 있습니다. 단순한 일기 기록을 넘어, 자신의 감정과 성격의 종류를 기반으로 생성되는 캐릭터의 성장이라는 **시각적 피드백 메커니즘**을 도입함으로써, 사용자에게 꾸준한 기록 동기를 부여합니다.

주요 기능은 다음과 같습니다.

- **일기 입력** : 일기를 작성하고, 다시 읽을 수 있는 기능을 제공합니다.
- **감정 분석** : 일기를 작성하면 ChatGPT API를 이용해 감정을 분석하여, 100가지 감정 중 일부로 분류합니다. 감정은 색상으로 시각화되며, 오늘 캐릭터의 표정이 됩니다. 이는 캐릭터와 사용자의 동질감을 불러일으켜 공감을 이끌어 냅니다.
- **감정 기반 캐릭터 생성 및 성장**: 사용자의 감정 데이터를 기반으로 MBTI 중 4가지 유형(EF, ET, IF, IT)의 캐릭터가 생성되며, 감정 기록이 누적됨에 따라 생애주기(영아기 ~ 성년기)를 따라 성장합니다.
- **감정 캘린더 및 분석 시각화**: 달력에는 날짜별 감정의 색이 표시되고, 감정 분포 그래프를 통해 사용자가 자신의 정서 패턴을 시각적으로 확인할 수 있습니다. 이 시각적 요인은 자신의 감정 변화를 되돌아보게 하며, 힘들었던 시기라고 생각하였어도 그 사이 스며들 듯 남아 있는 따뜻한 순간들을 발견하게 해줍니다.

이러한 활동을 꾸준히 이어가면, 사용자는 일상 속 작은 감정들을 인식하고 받아들이는 습관을 형성하게 됩니다. 프로젝트의 최종 목표는 단순한 기록을 넘어 **‘감정과 기억의 지도’를 사용자 스스로 그려가며, 자기 자신을 캐릭터로 이해할 수 있도록 돕는 것**입니다.

결과적으로, Mory는 단순한 감정 기록 도구를 넘어서 **정서적 자각, 회고, 자기 성장이라는 경험을 자연스럽게 유도하는 플랫폼**이 될 것입니다. 사용자는 매일의 감정을 통해 나를 바라보는 새로운 시선을 갖게 되며, 이는 정신 건강 증진에도 긍정적인 영향을 줄 것으로 기대됩니다.

## 기술 스택

- **프론트엔드**: React Native, Expo, TypeScript
- **백엔드**: Node.js, Express, MongoDB
- **AI 분석**: OpenAI ChatGPT API

# API 명세서

[https://mory-backend-production.up.railway.app/](https://mory-backend-production.up.railway.app/) 

(주의: http→https)

JWT가 존재하지 않거나, 만료되었다면 `Unauthorized Error`

- 테스트 데이터 생성 쿼리
    
    ```sql
    INSERT INTO diary (id, title, content, createdAt, year, month, day, userId)
    VALUES 
    (20, '행복한 하루', '오늘은 기분이 좋았다.', NOW(), 2025, 8, 1, 7),
    (21, '짜증나는 하루', '스트레스를 많이 받았다.', NOW(), 2025, 8, 2, 7),
    (22, '짜증나는 하루', '스트레스를 많이 받았다.', NOW(), 2025, 8, 3, 7),
    (23, '짜증나는 하루', '스트레스를 많이 받았다.', NOW(), 2025, 8, 4, 7),
    (24, '짜증나는 하루', '스트레스를 많이 받았다.', NOW(), 2025, 8, 5, 7);
    
    INSERT INTO analysis (id, diaryId, primary_emotion_type, feel, ratio)
    VALUES 
    (20, 20, 'GREEN',
        JSON_OBJECT(
            'RED', JSON_ARRAY(),
            'YELLOW', JSON_ARRAY(),
            'BLUE', JSON_ARRAY('행복한', '만족스러운'),
            'GREEN', JSON_ARRAY('편안한', '고요한')
        ),
        JSON_OBJECT(
            'RED', 0,
            'YELLOW', 0.1,
            'BLUE', 0.2,
            'GREEN', 0.7
        )
    ),
    (21, 21, 'RED',
        JSON_OBJECT(
            'RED', JSON_ARRAY('스트레스 받는', '화가 치밀어 오른'),
            'YELLOW', JSON_ARRAY(),
            'BLUE', JSON_ARRAY(),
            'GREEN', JSON_ARRAY()
        ),
        JSON_OBJECT(
            'RED', 0.7,
            'YELLOW', 0.1,
            'BLUE', 0.1,
            'GREEN', 0.1
        )
    ),
    (22, 22, 'RED',
        JSON_OBJECT(
            'RED', JSON_ARRAY('스트레스 받는', '화가 치밀어 오른'),
            'YELLOW', JSON_ARRAY(),
            'BLUE', JSON_ARRAY(),
            'GREEN', JSON_ARRAY()
        ),
        JSON_OBJECT(
            'RED', 0.7,
            'YELLOW', 0.1,
            'BLUE', 0.1,
            'GREEN', 0.1
        )
    ),
    (23, 23, 'GREEN',
        JSON_OBJECT(
            'RED', JSON_ARRAY('스트레스 받는', '화가 치밀어 오른'),
            'YELLOW', JSON_ARRAY(),
            'BLUE', JSON_ARRAY(),
            'GREEN', JSON_ARRAY()
        ),
       JSON_OBJECT(
            'RED', 0.7,
            'YELLOW', 0.1,
            'BLUE', 0.1,
            'GREEN', 0.1
        )
    ),
    (24, 24, 'YELLOW',
        JSON_OBJECT(
            'RED', JSON_ARRAY('스트레스 받는', '화가 치밀어 오른'),
            'YELLOW', JSON_ARRAY(),
            'BLUE', JSON_ARRAY(),
            'GREEN', JSON_ARRAY()
        ),
       JSON_OBJECT(
            'RED', 0.7,
            'YELLOW', 0.1,
            'BLUE', 0.1,
            'GREEN', 0.1
        )
    );
    
    update diary SET analysisId=20 where id=20;
    update diary SET analysisId=21 where id=21;
    update diary SET analysisId=22 where id=22;
    update diary SET analysisId=23 where id=23;
    update diary SET analysisId=24 where id=24;
    ```
    

# [ Get ]

- 🔒Google 로그인 `/auth/google`
    
    요청시 구글 로그인 페이지로 리다이렉트 됨
    
- 🔒Google 리다이렉션 `/auth/google/redirect`
    
    계정이 있는 경우 : 로그인
    
    ```json
    {
      "status": "login",
      "value": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJrb3JlYW4xNzkwQGdtYWlsLmNvbSIsIm5hbWUiOiLsnbTsnqztl4wiLCJyb2xlIjoidXNlciIsImlhdCI6MTc1MjMzODgyNCwiZXhwIjoxNzUyMzUzMjI0fQ.h3hA3Q2UigkBooQwyN9zb_NTY99MEG_vFZ58GJSttlo"
      }
    }
    ```
    
    계정이 없는 경우 : 회원가입
    
    ```json
    {
      "status": "register",
      "value": {
        "email": "korean1790@gmail.com",
        "name": "이재헌",
        "provider": "google"
      }
    }
    ```
    
- 🌠Mory 데이터 조회 `/auth/mory`
    
    ```json
    {
        "id": 3,
        "growing": 1
    }
    ```
    
- 📕일기 조회 `/diary/view/:id`
    
    ```json
    {
        "id": 8,
        "title": "test is test3",
        "content": "but test is not test3",
        "createdAt": "2025-07-12T16:52:02.081Z",
        "year": 2025,
        "month": 7,
        "day": 13,
        "user": {
            "id": 6,
            "name": "이재헌",
            "email": "korean1790@gmail.com",
            "password": "1234",
            "mbti": "EF",
            "provider": "google",
            "role": "user"
        },
        "analysis": null
    }
    ```
    
    자신의 일기가 아닌 경우
    
    ```json
    {
        "message": "해당 일기의 소유자가 아닙니다.",
        "error": "Forbidden",
        "statusCode": 403
    }
    ```
    
- 📕자신의 일기 모두 조회 `/diary`
    
    ```json
    [
        {
            "id": 8,
            "title": "test is test3",
            "content": "but test is not test3",
            "createdAt": "2025-07-12T16:52:02.081Z",
            "year": 2025,
            "month": 7,
            "day": 13,
            "user": {
                "id": 6,
                "name": "이재헌",
                "email": "korean1790@gmail.com",
                "password": "1234",
                "mbti": "EF",
                "provider": "google",
                "role": "user"
            },
            "analysis": null
        }
    ]
    ```
    
- 📕캘린더 전용 API `/diary/summary/:month`
    
    한 달동안 쓴 일기 분석 결과 정리
    
    - null : 일기 안씀
    - “YET” : 분석 결과 없음
    - “RED” | “BLUE” | “YELLOW” | “GREEN”
    
    ```json
    // Example: /diary/summary/7
    {
        "1": null,
        "2": null,
        "3": null,
        "4": null,
        "5": null,
        "6": null,
        "7": null,
        "8": null,
        "9": null,
        "10": null,
        "11": null,
        "12": null,
        "13": null,
        "14": null,
        "15": null,
        "16": null,
        "17": null,
        "18": null,
        "19": null,
        "20": null,
        "21": null,
        "22": null,
        "23": null,
        "24": null,
        "25": null,
        "26": "YELLOW",
        "27": "YET",
        "28": "YET",
        "29": "YET",
        "30": null,
        "31": null
    }
    ```
    
- 📊분석 결과 조회 `/analysis/:id`
    
    ```json
    {
        "id": 3,
        "primary_emotion_type": "RED",
        "emotions": {
            "RED": [
                "격분한",
                "초조한"
            ],
            "YELLOW": [
                "역겨운"
            ],
            "BLUE": [
                "긍정적인"
            ],
            "GREEN": [
                "태평한"
            ]
        },
        "ratio": [
            [
                "RED",
                0.6
            ],
            [
                "BLUE",
                0.2
            ],
            [
                "YELLOW",
                0.1
            ],
            [
                "GREEN",
                0.1
            ]
        ],
        "diary": {
            "id": 8,
            "title": "test is test3",
            "content": "but test is not test3",
            "createdAt": "2025-07-12T16:52:02.081Z",
            "year": 2025,
            "month": 7,
            "day": 13
        }
    }
    ```
    
- 🗓️월간 분석 결과 조회 `/monthly-analysis/:month`
    
    ```json
    {
        "month": 8,
        // 감정 비율 평균
        "ratios": {
            "RED": 0.4,
            "GREEN": 0.15,
            "YELLOW": 0.07,
            "BLUE": 0.08
        },
        // 감정이 존재하는 일기 수
        "emotions_count": {
            "RED": 4,
            "YELLOW": 0,
            "BLUE": 1,
            "GREEN": 1
        },
        // 전달에 비해 증가한 감정
        // 음수 -> 감소한 감정
        "emotions_count_delta": {
            "RED": 4,
            "YELLOW": 0,
            "BLUE": 1,
            "GREEN": 1
        },
        "id": 5
    }
    ```
    

# [ Post ]

- 🔒로그인 `/auth/login`
    
    Request
    
    ```json
    {
      "email" : "korean1790@gmail.com",
      "password" : "1234"
    }
    ```
    
    Response
    
    - 받은 accessToken은 요청할때 마다 Header > Bearer Token에 넣어주세요
    
    ```json
    {
    	accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJrb3JlYW4xNzkwQGdtYWlsLmNvbSIsIm5hbWUiOiLsnbTsnqztl4wiLCJyb2xlIjoidXNlciIsImlhdCI6MTc1MTc5NjE2NiwiZXhwIjoxNzUxODEwNTY2fQ.8__MrfJ0oq20P2JU7YA2FhLMRdLVEE6NDtuudQA6i-8"
    }
    ```
    
- 🔒회원가입 `/auth/register`
    
    Request
    
    ```json
    {
      "email": "korean1790@gmail.com",
      "name": "이재헌",
      "password": "1234",
      "mbti": "EF"
      "provider": "google"
    }
    ```
    
    Response
    
    ```json
    {
        "email": "korean1790@gmail.com",
        "name": "이재헌",
        "password": "$2b$10$JJjOvn4ywstXRrT8v9WmpOY7dvGhAo4DEn5UuVXM/FIJwU4blEQTG",
        "provider": "google",
        "id": 6,
        "mbti": "EF",
        "role": "user",
        "mory": {
            "user": {
                // 해당 유저에 대한 정보이므로 생략
            },
            "id": 2,
            "growing": 0
        }
    }
    ```
    
- 📕일기 생성 `/diary`
    
    같은 날 일기 있다면, 그날 일기의 내용을 수정하는 기능
    
    Request
    
    ```json
    {
      "title" : "test is test3",
      "content" : "but test is not test3"
    }
    ```
    
    Response
    
    ```json
    {
        "title": "test is test3",
        "content": "but test is not test3",
        "month": 7,
        "day": 13,
        "user": {
            "id": 6,
            "name": "이재헌",
            "email": "korean1790@gmail.com",
            "password": "1234",
            "mbti": "EF",
            "provider": "google",
            "role": "user",
            "diaries": []
        },
        "id": 8,
        "createdAt": "2025-07-12T16:52:02.081Z",
        "year": 2025
    }
    ```
    
- 📊분석 결과 생성 `/analysis/gpt`
    
    이미 분석 결과가 존재한다면, 새로운 분석 결과로 덮어 씀
    
    Response
    
    ```json
    {
      "diaryId": 9
    }
    ```
    
    Request
    
    ```json
    {
        "id": 4,
        "primary_emotion_type": "YELLOW",
        "feel": {
            "RED": [],
            "YELLOW": [
                "울적했다",
                "무거웠다"
            ],
            "BLUE": [
                "웃을"
            ],
            "GREEN": []
        },
        "ratio": {
            "RED": 0,
            "YELLOW": 0.5,
            "BLUE": 0.25,
            "GREEN": 0.25
        },
        "diary": {
            "id": 9,
            "title": "아무런 일기",
            "content": "오늘은 괜히 기분이 울적했다.햇살은 좋았지만 마음은 어쩐지 무거웠다.학교에서 친구들과 얘기를 나누긴 했지만, 자꾸 딴 생각이 났다. 그래도 집에 와서 강아지가 반겨줘서 조금은 웃을 수 있었다. 이런 날은 그냥 일찍 자는 게 좋을 것 같다.",
            "createdAt": "2025-07-26T05:43:59.203Z",
            "year": 2025,
            "month": 7,
            "day": 26
        }
    }
    ```
    

# [ Patch ]

- 🔒계정 정보 수정 `/auth`
    
    Request
    
    ```json
    {
      "name": "이재헌22",
    }
    ```
    
    Response
    
    ```json
    {
        "generatedMaps": [],
        "raw": [],
        "affected": 1
    }
    ```
    
- 📕일기 수정 `/diary/:id`
    
    Request
    
    ```json
    {
      "title" : "test is not test T.T",
      "content" : "but test is test"
    }
    ```
    
    Response
    
    ```json
    {
        "generatedMaps": [],
        "raw": [],
        "affected": 1
    }
    ```
    

# [ Delete ]

- 🔒회원탈퇴 `/auth/me`
    
    ```json
    {
        "raw": [],
        "affected": 1
    }
    ```