import React, {useEffect, useState} from "react";
import Typography from "@material-ui/core/Typography";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import TableBody from "@material-ui/core/TableBody";
import {AuthenticatedUserRepository} from "../../services/auth/AuthenticatedUserRepository";
import {GetReaderPaymentsUseCase} from "../../usecases/getpayments/GetReaderPaymentsUseCase";
import Skeleton from "@material-ui/lab/Skeleton";
import Tooltip from "@material-ui/core/Tooltip";
import moment from "moment";
import 'moment/locale/es';
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1, color: '#ffffff',
    }, mainContainer: {
        padding: theme.spacing(8, 0, 6),
    }, tableContainer: {
        marginTop: theme.spacing(6),
    }, exploreButtonContainer: {
        marginTop: theme.spacing(6),
        display: "flex",
        justifyContent: "center"
    }, MuiButtonRoot: {
        width: '40%'
    }
}));

const MyPayments = () => {
    const classes = useStyles();
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        setOpenBackdrop(true)
        new GetReaderPaymentsUseCase(new AuthenticatedUserRepository()).execute()
            .then((payments) => setPayments(payments))
            .catch((error) => console.error(error))
            .finally(() => setOpenBackdrop(false))
    }, []);

    return <Container maxWidth="md" component="main" className={classes.mainContainer}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            My payments
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
            Lorem ipsum dolor sit amet, te vis autem ridens utamur, aperiam impedit apeirian ea eam, nec ei saepe eirmod. Modus
            moderatius cum te, te populo similique nam. Vim at indoctum tincidunt, brute accusam eum ad. Pri modo fugit at, cu vitae
            constituam sea, et usu novum eripuit mediocritatem. Quaestio constituto ius ea.
        </Typography>

        {payments.length === 0 ? <PaymentsSkeleton/> : <TableContainer component={Paper} className={classes.tableContainer}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Payment Identifier</TableCell>
                        <TableCell align="center">Import</TableCell>
                        <TableCell align="center">Type</TableCell>
                        <TableCell align="center">Started at</TableCell>
                        <TableCell align="center">Completed at</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {payments.map((payment) => (<TableRow key={payment.id}>
                        <Tooltip placement="top-start" title={payment.id}><TableCell align="center">{payment.id.substr(0, 15)} </TableCell></Tooltip>
                        <TableCell align="center">{payment.amount.amount}€</TableCell>
                        <TableCell align="center"><a href={"/books/" + payment.book}>{payment.type}</a></TableCell>
                        <TableCell align="center">{moment(payment.startedAt).format('lll')}</TableCell>
                        <TableCell align="center">{moment(payment.startedAt).format('lll')}</TableCell>
                    </TableRow>))}
                </TableBody>
            </Table>
        </TableContainer>}

        {(payments.length > 0) && <div className={classes.exploreButtonContainer}>
            <Button href="/" variant="contained" color="primary" size={"large"} classes={{
                root: classes.MuiButtonRoot
            }}>Explore</Button>
        </div>}

        <Backdrop className={classes.backdrop} open={openBackdrop}>
            <CircularProgress color="inherit"/>
        </Backdrop>
    </Container>
}

export default MyPayments

const PaymentsSkeleton = () => {
    return <Paper elevation={5}>
        <TableContainer component={Paper} style={{marginTop: "20px"}}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">PaymentId</TableCell>
                        <TableCell align="center">Import</TableCell>
                        <TableCell align="center">Type</TableCell>
                        <TableCell align="center">Book</TableCell>
                        <TableCell align="center">Started at</TableCell>
                        <TableCell align="center">Completed at</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {["1", "2", "3", "4", "5"].map((skeletonId) => (<TableRow key={skeletonId}>
                        <TableCell align="center"><Skeleton variant={"text"}/></TableCell>
                        <TableCell align="center"><Skeleton variant={"text"}/></TableCell>
                        <TableCell align="center"><Skeleton variant={"text"}/></TableCell>
                        <TableCell align="center"><Skeleton variant={"text"}/></TableCell>
                        <TableCell align="center"><Skeleton variant={"text"}/></TableCell>
                        <TableCell align="center"><Skeleton variant={"text"}/></TableCell>
                    </TableRow>))}
                </TableBody>
            </Table>
        </TableContainer>
    </Paper>
}