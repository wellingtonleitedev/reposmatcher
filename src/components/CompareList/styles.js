import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 50px;
`;

export const Repository = styled.div`
  background-color: #fff;
  border-radius: 3px;
  display: flex;
  margin: 10px 10px;
  flex-direction: column;
  width: 250px;

  button {
    background: transparent;
    border: 0;
    cursor: pointer;
    padding: 10px 5px;
  }

  header {
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 64px;
    }

    strong {
      font-size: 24px;
      margin-top: 10px;
    }

    small {
      font-size: 14px;
      color: #666;
    }
  }

  ul {
    list-style: none;

    li {
      font-weight: bold;
      padding: 12px 20px;

      small {
        color: #999;
        font-weight: normal;
        font-size: 12px;
        font-style: italic;
        margin-left: 10px;
      }

      &:nth-child(2n - 1) {
        background-color: #f5f5f5;
      }
    }
  }
`;
