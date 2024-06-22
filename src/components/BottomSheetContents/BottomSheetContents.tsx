import {ForwardedRef, forwardRef, useEffect, useImperativeHandle} from 'react';
import {useBottomSheetContents} from '../../providers/BottomSheetContentsProvider/BottomSheetContentsProvider';
import {useBottomSheet} from '../../providers/BottomSheetProvider/BottomSheetProvider';
import {BottomSheetProps} from '@gorhom/bottom-sheet';

type BottomSheetContentsProps = BottomSheetProps & {
  children?: React.ReactNode;
};

export const BottomSheetContents = forwardRef(
  (
    props: BottomSheetContentsProps,
    ref: ForwardedRef<BottomSheetContentsMethods>,
  ) => {
    const {setSheetProps} = useBottomSheetContents();
    const {open, close} = useBottomSheet();

    useImperativeHandle(
      ref,
      () => ({
        open: () => {
          setSheetProps({...props} as BottomSheetProps);
          open();
        },
        close: () => {
          setSheetProps({} as BottomSheetProps);
          close();
        },
      }),
      [open, close, props, setSheetProps],
    );

    useEffect(() => {
      setSheetProps({...props} as BottomSheetProps);
    }, [setSheetProps, props]);

    return null;
  },
);

export type BottomSheetContentsMethods = {
  open: () => void;
  close: () => void;
};
