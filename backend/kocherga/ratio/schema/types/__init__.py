from .notebook_pages import exported_types as notebook_exported_types
from .order import RatioOrder, RatioOrderConnection
from .payment import RatioPayment
from .presentation import exported_types as presentation_exported_types
from .promocode import RatioPromocode, RatioPromocodeConnection
from .schedule import RatioTrainer, RatioTrainingDay
from .testimonial import RatioTestimonial, RatioTestimonialConnection
from .ticket import RatioTicket, RatioTicketConnection
from .ticket_type import RatioTicketType
from .training import RatioTraining, RatioTrainingConnection

__all__ = [
    'RatioTraining',
    'RatioTrainingConnection',
    'RatioTrainingDay',
    'RatioTrainer',
    'RatioTicket',
    'RatioTicketConnection',
    'RatioPayment',
    'RatioOrder',
    'RatioOrderConnection',
    'RatioTicketType',
    'RatioPromocode',
    'RatioPromocodeConnection',
    'RatioPresentationIndexPage',
    'RatioPresentationPage',
    'RatioTestimonial',
    'RatioTestimonialConnection',
]

exported_types = [
    *presentation_exported_types,
    *notebook_exported_types,
]
