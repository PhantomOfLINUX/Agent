# 호스트 http://localhost:3000/

## post 경로

-   채점 "/grade"
-   환경 "/compose"

## body 예시

```json
{
    "stageCode": "s1001",
    "questionIndex": 1
}
```

## image_tag_config.json 사용법

예시

```json
{
    "latest": true,
    "target": ["s1001", "s1002"]
}
```

-   `latest` : "latest" 태그 포함 여부를 표시
-   `target` : "멀티 빌드 후 멀티 푸시할 태그를 배열에 작성"
