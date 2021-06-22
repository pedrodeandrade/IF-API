interface GenerateLedgerReport {
  handle() : Promise<string[]>
}

export default GenerateLedgerReport;
