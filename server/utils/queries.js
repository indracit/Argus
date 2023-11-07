

const rrnQueries = (tablename,rrns) => {

    let query = '';

    if(tablename === 'TCS(22/07/23 - 25/09/23) - Issuer'){
        query = `SELECT TXN_ID,l.rrn_req as RRN_REQ,from_account as FROM_ACCOUNT,TXN_SERVICE,TXN_DATE,
        TXN_TIME,amount as AMOUNT,bank_name as BANK_NAME,ACQ_BANK_ID,ACQ_ID,TERMINALID,LOCATION,
        STATUS FROM (SELECT TXN_ID,a.rrn_req,from_account,TXN_SERVICE,TXN_DATE,
        TXN_TIME,a.amount,ACQ_BANK_ID,ACQ_ID,TERMINALID,LOCATION,STATUS FROM 
        (SELECT received_time,TXN_ID,rrn_req,CASE WHEN service_id = 'N_CSHWDL' THEN '04' WHEN service_id = 'N_PURTXN' THEN '25' ELSE 'NULL' END
        TXN_SERVICE,DATE_FORMAT(DATE(received_time),'%d%m%Y') TXN_DATE,DATE_FORMAT(TIME(received_time),'%H:%i:%s')
        TXN_TIME,amount,LEFT(user_id,6) ACQ_BANK_ID,RIGHT(user_id,3) ACQ_ID,TERMINALID,LOCATION,STATUS FROM full_txn_report_new_missing
        WHERE service_id IN ('N_CSHWDL','N_PURTXN') AND handle_id = 'N_CSHWDL' AND rrn_req IN 
        ('${rrns}'))a 
        JOIN (SELECT rrn_req,from_account,received_time,amount 
        FROM full_txn_report_new_missing WHERE service_id IN ('N_AGENTWD','N_PURTXN') AND handle_id IN ('ISS_AE_WDL','N_CSHPURTXN') AND rrn_req IN
        ('${rrns}'))b
        WHERE CONCAT(a.rrn_req,DATE_FORMAT(TIME(a.received_time),'%H:%i'),a.amount) = CONCAT(b.rrn_req,DATE_FORMAT(TIME(b.received_time),'%H:%i'),b.amount))l LEFT JOIN (SELECT bank_acq_id,bank_name 
        FROM ib_fi_prod.acq_id_master)c ON l.ACQ_BANK_ID = c.bank_acq_id`
    }

    if(tablename ==='TCS(29/11/22 - 22/07/23) - Issuer'){
        query = `SELECT TXN_ID,l.rrn_req as RRN_REQ,from_account as FROM_ACCOUNT,TXN_SERVICE,TXN_DATE,
        TXN_TIME,amount as AMOUNT,bank_name as BANK_NAME,ACQ_BANK_ID,ACQ_ID,TERMINALID,LOCATION,
        STATUS FROM (SELECT TXN_ID,a.rrn_req,from_account,TXN_SERVICE,TXN_DATE,
        TXN_TIME,a.amount,ACQ_BANK_ID,ACQ_ID,TERMINALID,LOCATION,STATUS FROM 
        (SELECT received_time,TXN_ID,rrn_req,CASE WHEN service_id = 'N_CSHWDL' THEN '04' WHEN service_id = 'N_PURTXN' THEN '25' ELSE 'NULL' END
        TXN_SERVICE,DATE_FORMAT(DATE(received_time),'%d%m%Y') TXN_DATE,DATE_FORMAT(TIME(received_time),'%H:%i:%s')
        TXN_TIME,amount,LEFT(user_id,6) ACQ_BANK_ID,RIGHT(user_id,3) ACQ_ID,TERMINALID,LOCATION,STATUS FROM full_txn_report_new
        WHERE service_id IN ('N_CSHWDL','N_PURTXN') AND handle_id = 'N_CSHWDL' AND rrn_req IN 
        ('${rrns}'))a 
        JOIN (SELECT rrn_req,from_account,received_time,amount 
        FROM full_txn_report_new WHERE service_id IN ('N_AGENTWD','N_PURTXN') AND handle_id IN ('ISS_AE_WDL','N_CSHPURTXN') AND rrn_req IN
        ('${rrns}'))b
        WHERE CONCAT(a.rrn_req,DATE_FORMAT(TIME(a.received_time),'%H:%i'),a.amount) = CONCAT(b.rrn_req,DATE_FORMAT(TIME(b.received_time),'%H:%i'),b.amount))l LEFT JOIN (SELECT bank_acq_id,bank_name 
        FROM ib_fi_prod.acq_id_master)c ON l.ACQ_BANK_ID = c.bank_acq_id`
    }

    if (tablename === 'Integra - Issuer'){
        query  = `select itgs_unique_id txn_id,
        itgs_gateway_rrn as rrn_req,
        itgs_from_acct_no as from_account,
        (case when itgs_vendor_req in  ('011000','010000') then '25'
        when itgs_vendor_req in ('000000') then '25' 
            when itgs_vendor_req in ('210000') then '32' 
            else itgs_vendor_req end
        ) as txn_service,
        to_char(itgs_request_time,'DDMMYYYY') as TXN_DATE,
        to_char(itgs_request_time,'hh24:mm:ss') as TXN_TIME,
        itgs_trans_amt as amount,
        (select distinct bank_name from acq_bank_list where acq_id = a.itgs_issuer_bank ) as bank_name,
        itgs_issuer_bank as acq_bank_id,
        SUBSTR(itgs_udc,0,3) acq_id,
        itgs_udc as terminalid,
        location,
        (case when itgs_vendor_res = '00' then 'S' 
        else 'F' end) as status
        from itgmis_trans_log0001 a
        where itgs_gateway_RRN in 
        ('${rrns}')
        and itgs_trans_amt > 0 and itgs_trans_type='4'`
    }
    return query;
} 


module.exports = {rrnQueries}