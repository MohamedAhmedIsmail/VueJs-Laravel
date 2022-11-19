<?php
namespace App\Classes;
class DataHandler
{
    public function handleOptionsData($others,$options,$data)
    {
//        dd($data);
        for($i=0;$i<count($others);$i++)
        {
            for($j=0;$j<count($options);$j++)
            {
                if(isset($options[$j]['index']) && (isset($others[$i]) && $i == $options[$j]['index']))
                {
                    $data['options'][$j]['value'] = $others[$i];
                }
                else if(isset($options[$j]['index']) && (isset($others[$i]) && $i == $options[$j]['option_id']))
                {
                    $data['options'][$j]['value'] = $others[$i];
                }
            }
        }
//        dd($data);
        return $data;
    }

    public static function handleData($data)
    {
        $self = new self;
        $others = $data['other'];
        $options = $data['options'];
        $data = $self->handleOptionsData($others,$options,$data);
        foreach($data as $key=>$value)
        {
            if(!is_array($value)) {
                $object[$key] = $value;
            }
            if(is_array($value) && $key =='options')
            {
                for($i=0;$i<count($value);$i++)
                {
                    if(isset($value[$i]['property_name']) && $value[$i]['value']!='Other')
                    {
                        $object[$value[$i]['property_name']] = $value[$i]['value'];
                    }
                }
            }
        }
//        dd($object);
        return $object;
    }
}

