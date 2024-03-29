
import { PropTypes } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

function Account(props) {
    const ACCOUNT_TITLE = props.accountTitle;
    const ACCOUNT_AMOUNT = props.accountAmount;
    const ACCOUNT_AMOUNT_DESCRIPTION = props.accountAmountDescription;
    const ACCOUNT_AMOUNT_FORMAT = amountFormat(ACCOUNT_AMOUNT);

    return (
        <section className={`account ${props.editing ? 'editing' : ''}`}>
            <div className="account-content-wrapper">
                <h2 className="account-title">Argent Bank {ACCOUNT_TITLE}</h2>
                <p className="account-amount">${ACCOUNT_AMOUNT_FORMAT}</p>
                <p className="account-amount-description">{ACCOUNT_AMOUNT_DESCRIPTION} Balance</p>
            </div>

            {props.editing ? (
                <FontAwesomeIcon icon={faChevronRight} className="chevron-icon" />
            ) : (
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button></div>
            )}

        </section>
    )
}

function amountFormat(number) {
    return new Intl.NumberFormat('en-US').format(number);
}

Account.propTypes = {
    accountTitle: PropTypes.string,
    accountAmount: PropTypes.number,
    accountAmountDescription: PropTypes.string,
    editing: PropTypes.bool.isRequired
}

export default Account;