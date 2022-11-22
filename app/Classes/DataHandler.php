<?php
namespace App\Classes;
class DataHandler
{
    public function handleOptionsData($others,$options,$data)
    {
        $index=[];
        for($i=0;$i<count($options);$i++)
        {
            for($j=0;$j<count($options);$j++)
            {
                if($i!=$j)
                {
                    if(isset($options[$i]) && isset($options[$j]) && $options[$i]['index'] == $options[$j]['index'] && $options[$i]['value']=='Other')
                    {
                        $index[] = $j;
                    }
                }
            }
        }
        for($i=0;$i<count($index);$i++)
        {
            unset($options[$index[$i]]);
            unset($data['options'][$index[$i]]);
        }
        for($i=0;$i<count($others);$i++)
        {
            for($j=0;$j<count($options);$j++)
            {
                if(isset($options[$j]['index']) && (isset($others[$i]) && $i == $options[$j]['index']) && $options[$j]['value']=='Other')
                {
                    $data['options'][$j]['value'] = $others[$i];
                }
                else if(isset($options[$j]['index']) && (isset($others[$i]) && $i == $options[$j]['option_id']) &&  $options[$j]['value']=='Other')
                {
                    $data['options'][$j]['value'] = $others[$i];
                }
            }
        }
        return $data;
    }

    public static function handleData($data)
    {
        $self = new self;
        $others = $data['other'];
        $options = $data['options'];
        $data = $self->handleOptionsData($others,$options,$data);
        $object = [];
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

