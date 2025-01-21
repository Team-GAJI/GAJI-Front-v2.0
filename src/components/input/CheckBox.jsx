import styled from "styled-components";

export const CheckBox = styled.input.attrs({ type: "checkbox" })`
  appearance: none;
  width: 1.25rem;
  height: 1.25rem;
  background-color: #ffffff;
  border: solid 0.25px #8e59ff;
  border-radius: 100%;

  &:checked {
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 8 6' fill='%23FFFFFF' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M7.53003 0.220011C7.67048 0.360637 7.74937 0.551261 7.74937 0.750011C7.74937 0.948762 7.67048 1.13939 7.53003 1.28001L3.03003 5.78001C2.8894 5.92046 2.69878 5.99935 2.50003 5.99935C2.30128 5.99935 2.11065 5.92046 1.97003 5.78001L0.47003 4.28001C0.33755 4.13784 0.265426 3.94979 0.268855 3.75549C0.272283 3.56119 0.350995 3.3758 0.488408 3.23839C0.625821 3.10098 0.811206 3.02226 1.00551 3.01884C1.19981 3.01541 1.38785 3.08753 1.53003 3.22001L2.50003 4.19001L6.47003 0.220011C6.61066 0.079561 6.80128 0.000671387 7.00003 0.000671387C7.19878 0.000671387 7.3894 0.079561 7.53003 0.220011Z' fill='%23FFFFFF'/%3E%3C/svg%3E%0A");
    background-size: 40% 40%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: #8e59ff;
  }
`;
