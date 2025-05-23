import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";

import useBooking from "../bookings/useBooking.js";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import useCheckin from "./useCheckin.js";
import { useNavigate } from "react-router-dom";
import useSettings from "./useSettings.js";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirm, setConfirm] = useState(false);
  const [needBreakfast, setNeedBreakfast] = useState(false);
  const navigate = useNavigate();

  const { booking, isLoading } = useBooking();
  const { checkin, isChecking } = useCheckin();

  const { settings, isSettingLoading } = useSettings();

  const moveBack = useMoveBack();

  useEffect(() => {
    if (booking?.isPaid ?? false) {
      setConfirm(true);
    }
    if (booking?.hasBreakfast ?? false) {
      setNeedBreakfast(true);
    }
  }, [booking]);

  if (isLoading || isSettingLoading) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    isPaid,
    cabinPrice,
  } = booking;

  const breakfastTotalPrice = settings.breakfastPrice * numNights * numGuests;
  function handleCheckin() {
    if (!confirm) return;

    let extrasPrice = 0;
    let totalPrice = cabinPrice;

    if (needBreakfast) {
      extrasPrice = breakfastTotalPrice;
      totalPrice = cabinPrice + breakfastTotalPrice;
    }

    checkin({
      bookingId,
      breakfast: {
        hasBreakfast: needBreakfast,
        extrasPrice,
        totalPrice,
      },
    });
    navigate("/dashboard");
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          checked={needBreakfast}
          onChange={() => setNeedBreakfast((breakfast) => !breakfast)}
          disabled={needBreakfast && isPaid}
          id="breakfast"
        >
          {" "}
          Want to add breakfast for {formatCurrency(breakfastTotalPrice)} ?
        </Checkbox>
      </Box>

      <Box>
        <Checkbox
          checked={confirm}
          onChange={() => setConfirm((confirm) => !confirm)}
          disabled={isPaid}
          id="confirm"
        >
          confirm that {guests.fullName} has paid the total amount of
          {needBreakfast
            ? ` ${formatCurrency(cabinPrice + breakfastTotalPrice)}(
                ${formatCurrency(cabinPrice)} + ${formatCurrency(
                breakfastTotalPrice
              )}
              )`
            : formatCurrency(cabinPrice)}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirm || isChecking}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
