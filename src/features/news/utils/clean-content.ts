export const cleanContent = (content: string) => {
  // 정규식 설명:
  // \[ : 대괄호 시작
  // 블록미디어 : 해당 문자열 찾기
  // \s+ : 공백이 하나 이상 있음
  // .*? : 기자 이름 (어떤 문자든 올 수 있음, 최소 매칭)
  // 기자 : 해당 문자열 찾기
  // \] : 대괄호 끝
  const regex = /\[블록미디어\s+.*?\s*기자\]/;

  const match = content.match(regex);

  if (match) {
    const matchIndex = content.indexOf(match[0]);
    const contentAfterTag = content.slice(matchIndex + match[0].length);

    return contentAfterTag.trim(); // 앞뒤 불필요한 공백 제거
  }

  return content;
};
