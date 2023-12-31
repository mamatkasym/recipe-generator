from datetime import datetime
from typing import TYPE_CHECKING
from uuid import UUID

from fastapi_users_db_sqlalchemy import GUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql.functions import func
from sqlalchemy.sql.schema import ForeignKey
from sqlalchemy.sql.sqltypes import DateTime, ARRAY

from app.db import Base

if TYPE_CHECKING:
    from app.models.user import User  # noqa: F401


class Recipe(Base):
    __tablename__ = "recipe"

    id: Mapped[int] = mapped_column(primary_key=True)
    dish_name: Mapped[str]
    ingredients: Mapped[str]
    description: Mapped[str]
    user_id: Mapped[UUID] = mapped_column(GUID, ForeignKey("users.id"))
    user: Mapped["User"] = relationship(back_populates="recipes")

    created: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
    updated: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    value: Mapped[str | None]
