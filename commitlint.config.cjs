module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "ci",
        "chore",
        "docs",
        "ticket",
        "feat",
        "fix",
        "perf",
        "refactor",
        "revert",
        "style",
      ],
    ],
    "subject-max-length": [2, "always", 100], // 커밋 메시지의 최대 길이 제한
    "subject-case": [0], // 커밋 메시지의 대소문자 제한을 끕니다.
    "header-full-stop": [0], // 커밋 메시지 끝에 마침표 강제 제한을 끕니다.
    "type-case": [2, "always", "lower-case"], // 커밋 타입은 소문자여야 함
    "subject-empty": [2, "never"], // 커밋 메시지의 주제는 비어있으면 안 됨
  },
};
