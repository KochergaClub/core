import kocherga.db

class FinAccount(kocherga.db.Base):
    __tablename__ = "fin_accounts"

    id = Column(Integer, primary_key=True)
    name = Column(String(40), nullable=False)
    parent_id = Column(Integer, ForeignKey('fin_accounts.id'))

    @classmethod
    def add(cls, name, parent_id=None):
        account = FinAccount(name=name, parent_id=parent_id)
        kocherga.db.Session().add(account)
        return account

    def add_child(self, name):
        return FinAccount.add(name, parent_id=self.id)


class FinTransaction(kocherga.db.Base):
    __tablename__ = "fin_transactions"

    id = Column(Integer, primary_key=True)
    comment = Column(Text)

    @classmethod
    def add(cls, lines):
        raise NotImplementedError


class FinTransactionLine(kocherga.db.Base):
    __tablename__ = "fin_transaction_lines"
    __table_args__ = (
        UniqueConstraint("transaction_id", "account_id", name="transaction_account_pair"),
    )

    transaction_id = Column(Integer, ForeignKey('fin_transactions.id'), nullable=False)
    account_id = Column(Integer, ForeignKey('fin_accounts.id'), nullable=False)
    debit = Column(Numeric(10, 2), nullable=False)
    credit = Column(Numeric(10, 2), nullable=False)


def demo():
    cash = FinAccount.add('cash')
    cash.add_child('cash.register')
    cash.add_child('cash.tochka')

    FinAccount.add('equity')
    # FinAccount.add('yandex_kassa')
    # FinAccount.add('timepad')

    # инкассация
    FinTransaction.add(
        lines=[
            Line('cash', debit=5000),
            Line('slava_cash', credit=5000),
        ]
    )

    # зарплата
    add_transaction(
        lines=[
            Line(account='cash', credit=5000),
            Line(account='slava_cash', debit=5000),
        ]
    )
