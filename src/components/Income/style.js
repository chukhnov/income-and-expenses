import styled from 'styled-components'

export const IncomeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    justify-content: center;
    align-items: center;
    font-family: 'Roboto', sans-serif;

    .card{
        display: flex;
        flex-direction: row;
        width: 50%;
    }

    .table-wrapper{
        margin: 0 50px;
    }
`

export const FormWrapper = styled.div`
    display: flex;
    justify-content: center;

        form{
            width: 50%;
            .form-data{
                display: flex;
                align-items: center;
                flex-direction: column;
            }
            .submit-form-section{
                margin-top: 50px;
            }
        }
`
