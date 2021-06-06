import styled from 'styled-components'

export const HomeWrapper = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(3, 1fr);
  width: 100vw;
  height: 100vh;
`
export const HeaderPicture = styled.img`
  grid-column: 1 / 11;
`

export const ContactWrapper = styled.div`
  background-color: lightgoldenrodyellow;
`

export const IssueWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`